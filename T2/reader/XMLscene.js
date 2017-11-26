/**
 * XMLscene class, representing the scene that is to be rendered.
 * @constructor
 */
function XMLscene(interface) {
    CGFscene.call(this);

    this.interface = interface;

    this.cameraChosen = 0;
    this.shadderChosen = 0;

    this.lightValues = {};
    this.selectableValues = {};

    this.currTime = 0;
    this.flag_begin = 1;
    this.frames_sec = 100;
    this.pause = false;
    this.wireframe=false;
    
    this.restart = function(){
        this.graph.restartAnimation();
    }
    this.timeElapsed = 0;
    this.scaleFactor= 0;
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


    this.axis = new CGFaxis(this);

    this.testShaders=[this.defaultShader,
        new CGFshader(this.gl, "shaders/vertex.vert", "shaders/vertex.frag"),
        new CGFshader(this.gl, "./shaders/fragment.vert", "./shaders/fragment.frag"),
        new CGFshader(this.gl, "./shaders/vertex.vert", "./shaders/fragment.frag")
    ];


    this.testShaders[1].setUniformsValues({normScale: this.scaleFactor});
    this.testShaders[2].setUniformsValues({scaleFactor: this.scaleFactor});
    this.testShaders[3].setUniformsValues({normScale: this.scaleFactor, scaleFactor: this.scaleFactor});

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

            this.lights[i].setVisible(true);
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
    this.cameraFree = new CGFcamera(0.4,0.1,500,vec3.fromValues(15, 15, 15),vec3.fromValues(0, 0, 0));
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
    this.interface.addSelectableGroup(this.graph.selectables);
}

XMLscene.prototype.updateFrames = function(){
	this.setUpdatePeriod(1000/this.frames_sec);
}

XMLscene.prototype.update = function(currTime){
    this.updateFrames();

    if (this.cameraChosen == 1){
        this.camera = this.cameraTV;
    }
    else {
        this.camera = this.cameraFree;
    }

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
        }

    }
    this.updateShadders(currTime);

}

/**
 * Displays the scene.
 */
XMLscene.prototype.display = function() {
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
		this.axis.display();

        var i = 0;
        for (var key in this.lightValues) {
            if (this.lightValues.hasOwnProperty(key)) {
                if (this.lightValues[key]) {
                    this.lights[i].setVisible(true);
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

        // Displays the scene.
        this.graph.displayScene();

    }
	else
	{
		// Draw axis
		this.axis.display();
	}


    this.popMatrix();

    // ---- END Background, camera and axis setup

}

XMLscene.prototype.updateShadders = function(currTime){
    this.scaleFactor = 5*Math.sin(this.timeElapsed/1000);
    var for_color = 1 + Math.abs(this.scaleFactor)/2;
    this.testShaders[1].setUniformsValues({normScale: this.scaleFactor});
    this.testShaders[2].setUniformsValues({scaleFactor: for_color});
    this.testShaders[3].setUniformsValues({normScale: this.scaleFactor, scaleFactor: for_color});

}
