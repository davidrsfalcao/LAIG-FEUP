/**
 * XMLscene class, representing the scene that is to be rendered.
 * @constructor
 */
function XMLscene(interface) {
    CGFscene.call(this);

    this.interface = interface;

    this.cameraChosen = 0;

    this.lightValues = {};
    this.selectableValues = {};

    this.currTime = 0;
    this.flag_begin = 1;
    this.frames_sec = 100;
    this.pause = false;
    this.board_matrix = []; //Store board matrix to undo plays
    this.board_res_matrix = []; //Store board res matrix to undo plays

    this.timeElapsed = 0;
    this.scaleFactor= 0;
    this.cells = [];
    this.pieces = [];
    this.cylinders = [];
    this.requests = [];
    this.player = 1;
    this.selected_piece;

    this.selected_scene = 1;


}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
 * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
 */
XMLscene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.enableTextures(true);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);

    this.axis = new CGFaxis(this);

    this.testShaders=[this.defaultShader,
        new CGFshader(this.gl, "shaders/vertex.vert", "shaders/vertex.frag"),
        new CGFshader(this.gl, "./shaders/fragment.vert", "./shaders/fragment.frag"),
        new CGFshader(this.gl, "./shaders/vertex.vert", "./shaders/fragment.frag")
    ];


    this.testShaders[1].setUniformsValues({normScale: this.scaleFactor});
    this.testShaders[2].setUniformsValues({scaleFactor: this.scaleFactor});
    this.testShaders[3].setUniformsValues({normScale: this.scaleFactor, scaleFactor: this.scaleFactor});

    this.piece = new Piece(this);
    this.board = new Board(this);
    this.cilinder = new PieceC(this);

    //this.cil = new Cylinder (this, 5, 1.5, 1.5, 10, 10, 1, 1);

    this.tex=new CGFappearance(this);
    this.tex.loadTexture("scenes/images/black.jpg");

    this.cellTex = new CGFappearance(this);
    this.cellTex.loadTexture("scenes/images/board.png");

    this.cellTex1 = new CGFappearance(this);
    this.cellTex1.loadTexture("scenes/images/board1.png");

    this.tex1=new CGFappearance(this);
    this.tex1.loadTexture("scenes/images/redwood.jpg");

    this.tex2=new CGFappearance(this);
    this.tex2.loadTexture("scenes/images/bluewood.jpg");

    initScene(this); //Init Scene on Game
    this.setPickEnabled(true);

}

/**
 * Initializes the scene lights with the values read from the LSX file.
 */
XMLscene.prototype.initLights = function() {
    var i = 0;
    // Lights index.

    // Reads the lights from the scene graph.
    for (var key in this.graph.lights) {
        if (i >= 8)
            break;              // Only eight lights allowed by WebGL.

        if (this.graph.lights.hasOwnProperty(key)) {
            var light = this.graph.lights[key];

            this.lights[i].setPosition(light[1][0], light[1][1], light[1][2], light[1][3]);
            this.lights[i].setAmbient(light[2][0], light[2][1], light[2][2], light[2][3]);
            this.lights[i].setDiffuse(light[3][0], light[3][1], light[3][2], light[3][3]);
            this.lights[i].setSpecular(light[4][0], light[4][1], light[4][2], light[4][3]);

            this.lights[i].setVisible(false);
            if (light[0])
                this.lights[i].enable();
            else
                this.lights[i].disable();

            this.lights[i].update();

            i++;
        }
    }

}

/**
 * Initializes the scene cameras.
 */
XMLscene.prototype.initCameras = function() {
    this.cameraFree = new CGFcamera(0.4,0.1,500,vec3.fromValues(15, 15, 80),vec3.fromValues(0, 0, 0));
    this.cameraTV = new CGFcamera(0.4,0.1,500,vec3.fromValues(10, 1, 3),vec3.fromValues(0, -1, 3));
    this.camera = this.cameraFree;

}

/* Handler called when the graph is finally loaded.
 * As loading is asynchronous, this may be called already after the application has started the run loop
 */
XMLscene.prototype.onGraphLoaded = function(){
    this.camera.near = this.graph.near;
    this.camera.far = this.graph.far;
    this.axis = new CGFaxis(this,this.graph.referenceLength);

    this.setGlobalAmbientLight(this.graph.ambientIllumination[0], this.graph.ambientIllumination[1],
    this.graph.ambientIllumination[2], this.graph.ambientIllumination[3]);

    this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);

    this.initLights();

    // Adds lights group.
    this.interface.addLightsGroup(this.graph.lights);
}

XMLscene.prototype.updateFrames = function(){
	this.setUpdatePeriod(1000/this.frames_sec);
}

XMLscene.prototype.update = function(currTime){
    this.updateFrames();

    if(this.flag_begin == 1){
        this.flag_begin = 0;
        this.currTime = currTime;
    }
    else {
        var deltaT = currTime - this.currTime;
        this.currTime = currTime;
        this.timeElapsed += deltaT;
        if (this.graph.loadedOk && this.pause == false){
            this.graph.update( deltaT);
            for (let i = 0; i < this.pieces.length; i++) {
                this.pieces[i].update(deltaT/1000);
            }
            for (let i = 0; i < this.cylinders.length; i++) {
                this.cylinders[i].update(deltaT/1000);
            }
        }

    }
    this.updateShadders(currTime);

}

/**
 * Displays the scene.
 */
XMLscene.prototype.display = function() {
    this.logPicking();
    this.clearPickRegistration();
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.pushMatrix();

    if (this.graph.loadedOk)
    {
        this.setUpdatePeriod(1000/this.frames_sec);
        // Applies initial transformations.
        this.multMatrix(this.graph.initialTransforms);

		// Draw axis
		//this.axis.display();

        //this.cil.display();
        var i = 0;
        for (var key in this.lightValues) {
            if (this.lightValues.hasOwnProperty(key)) {
                if (this.lightValues[key]) {
                    this.lights[i].setVisible(false);
                    this.lights[i].enable();
                }
                else {
                    this.lights[i].setVisible(false);
                    this.lights[i].disable();
                }
                this.lights[i].update();
                i++;
            }
        }

        this.graph.displayScene();
        this.clearPickRegistration();
        this.pushMatrix();
        this.rotate(Math.PI/2,0,1,0);

        for(let i=0; i< this.cells.length; i++){
            this.registerForPick(1+i, this.cells[i]);
            this.pushMatrix();
            this.translate(0,0.1,0);
            this.cells[i].display();
            this.popMatrix();

        }


        this.pushMatrix();

        this.translate(0,0.1,0);
        let size = this.cells.length;
        for (var i = 0; i < this.pieces.length; i++) {
            this.registerForPick(1+i+size, this.pieces[i]);
            this.pushMatrix();
            this.translate(0,0.1,0);

            this.pieces[i].display();
            this.popMatrix();
        }

        for (var i = 0; i < this.cylinders.length; i++) {
            this.pushMatrix();
            this.translate(0,3,0);
            this.rotate(Math.PI/2,1,0,0);
            this.cylinders[i].display();
            this.popMatrix();
        }

        this.popMatrix();
        this.popMatrix();

    }
	else
	{
		// Draw axis
		this.axis.display();
	}


    this.popMatrix();

    // ---- END Background, camera and axis setup

}

XMLscene.prototype.logPicking = function (){
	if (this.pickMode == false) {
		if (this.pickResults != null && this.pickResults.length > 0) {
			for (var i=0; i< this.pickResults.length; i++) {
				var obj = this.pickResults[i][0];
				if (obj)
				{
					var customId = this.pickResults[i][1];

                    if (obj instanceof TrianglePiece && (obj.player == this.player) && (obj.inGame)){
                        this.requests.push(new ChoosePiece(obj.line, obj.column));
                    }
                    else if(obj instanceof Cell && (obj.selected)){
                        this.requests.push(new MovePiece(this.selected_piece.line, this.selected_piece.column, obj.line, obj.column));
                    }
                    clearCellSelection();
                    //console.log(this.pickResults[i]);
					//console.log("Picked object: " + obj + ", with pick id " + customId);
				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}
	}
}

/**
 * Update shadders' scaleFactor
 * @param {Number} deltaT - time
 */
XMLscene.prototype.updateShadders = function(currTime){
    this.scaleFactor = 5*Math.sin(this.timeElapsed/1000);
    var for_color = 1 + Math.abs(this.scaleFactor)/2;
    this.testShaders[1].setUniformsValues({normScale: this.scaleFactor});
    this.testShaders[2].setUniformsValues({scaleFactor: for_color});
    this.testShaders[3].setUniformsValues({normScale: this.scaleFactor, scaleFactor: for_color});

}

XMLscene.prototype.newgame = function(){
    this.player = 1;
    this.board_matrix = [];
    this.board_res_matrix = [];
    this.requests.push(new StartGame(1,1));
}
