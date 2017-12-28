/**
 * Triangle - Constructs Triangle
 * @constructor
 * @param {Object} scene - this scene
 * @param {Number} x - coordinate x of first point
 * @param {Number} y - coordinate y of first point

 */
function TrianglePiece(scene, line, column, direction, player) {
    CGFobject.call(this, scene);
    this.scene=scene;
    this.line=line;
    this.column=column;
    this.height = 0;

    this.direction=direction;
    this.player=player;
    this.ang;
    this.inGame = false;
    this.animationTime = 1; // 1s
    this.animation = null; //{line: ll, column: cc, timeElapsed: time};
    this.animated = false;

    this.triangle = new Triangle(this.scene, -10, 0, 0, 10, 0, 0, 0, 10, 0);
    this.rectangle = new Rectangle(this.scene, 0, 0, Math.sqrt(200)+Math.sqrt(32), 3);
    this.triangle1 = new  Triangle(this.scene, 0, 0, 0, -10, 0, 0, -14, -4, 0);
    this.triangle2 = new  Triangle(this.scene, -14, -4, 0, -10, 0, 0, 0, 0, 0);
    this.rectangle2 = new Rectangle(this.scene, 0, 3, Math.sqrt(212), 0);


    switch(direction){
        case "n": this.ang=Math.PI;
        break;
        case"s": this.ang=0;
        break;
        case "e": this.ang=Math.PI/2;
        break;
        case "w" : this.ang= -Math.PI/2;
        break;
        case "ne" : this.ang = 3*Math.PI/4;
        break;
        case "se" : this.ang = Math.PI/4;
        break;
        case "nw" : this.ang = -Math.PI/4 *3;
        break;
        case "sw": this.ang = -Math.PI/4;
        break;
    }

    this.scene.pieces.push(this);

};

var degToRad = Math.PI/180;
TrianglePiece.prototype = Object.create(CGFobject.prototype);
TrianglePiece.prototype.constructor=TrianglePiece;

TrianglePiece.prototype.display = function(){

    if(this.player==1)
        this.scene.tex1.apply();
        else
        this.scene.tex2.apply();

    this.scene.pushMatrix();
        let dX = (this.column-5)*10;
        let dY = (this.line-5)*10;

        this.scene.translate(dX,this.height,dY);
        this.scene.pushMatrix();
            this.scene.rotate(this.ang, 0, 1, 0);
            this.scene.pushMatrix();

                this.scene.rotate(Math.PI/2, 1, 0, 0);
                this.scene.scale(0.3, 0.3, 0.3);
                this.triangle.display();

                this.scene.pushMatrix();
                    this.scene.rotate(Math.PI, 0, 1,0);
                    this.scene.translate(0, 0 , 3);
                    this.triangle.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                    this.scene.translate(0, 10,0);
                    this.scene.rotate(225*degToRad, 0, 0, 1);
                    this.scene.rotate(-Math.PI/2, 1, 0, 0);
                    this.rectangle.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                    this.scene.translate(0,0,-3);
                    this.scene.rotate(180*degToRad, 0, 1, 0);
                    this.scene.translate(0, 10,0);
                    this.scene.rotate(225*degToRad, 0, 0, 1);
                    this.scene.rotate(-Math.PI/2, 1, 0, 0);
                    this.rectangle.display();
                this.scene.popMatrix();

                this.triangle1.display();
                this.scene.pushMatrix();
                    this.scene.translate(0, 0, -3);
                    this.scene.rotate(Math.PI, 0, 1, 0);
                    this.triangle1.display();
                this.scene.popMatrix();


                this.scene.pushMatrix();
                    this.scene.translate(0, 0, -3);
                    this.triangle2.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                    this.scene.rotate(Math.PI, 0, 1, 0);
                    this.triangle2.display();
                this.scene.popMatrix();

                let angle= Math.PI/2 - Math.atan2(14,4);
                this.scene.pushMatrix();
                    this.scene.translate(-14, -4, -3);
                    this.scene.rotate(angle, 0, 0, 1);
                    this.scene.rotate(Math.PI/2, 1, 0, 0);
                    this.rectangle2.display();
                this.scene.popMatrix();


                this.scene.pushMatrix();
                    this.scene.rotate(Math.PI, 0,1,0);
                    this.scene.translate(-14, -4, 0);
                    this.scene.rotate(angle, 0, 0, 1);
                    this.scene.rotate(Math.PI/2, 1, 0, 0);
                    this.rectangle2.display();
                this.scene.popMatrix();

            this.scene.popMatrix();
        this.scene.popMatrix();
   this.scene.popMatrix();

}

TrianglePiece.prototype.update = function(deltaT){
    if(this.animated){
        this.animation.timeElapsed += deltaT;

        if(this.animation.timeElapsed >= this.animationTime){
            this.line = this.animation.line;
            this.column = this.animation.column;
            this.height = 0;
            this.angle = this.animation.angle;
            this.animated = false;
            this.animation = null;
        }
        else {
            let deltaL = this.animation.line - this.animation.iLine;
            let deltaC = this.animation.column - this.animation.iCol;
            let deltaA = this.animation.angle - this.animation.iAng;
            console.log(deltaA/degToRad);
            if(deltaA > Math.PI){
                let diff = 2*Math.PI - deltaA;
                deltaA = -diff;
            }else if(deltaA < -Math.PI){
                let diff = 2*Math.PI - Math.abs(deltaA);
                deltaA = diff;
            }
            let percentage = this.animation.timeElapsed/this.animationTime;

            this.line = this.animation.iLine + (deltaL * percentage);
            this.column = this.animation.iCol + (deltaC * percentage);
            this.height = Math.sin(Math.PI * percentage)*10;
            this.ang = this.animation.iAng + (deltaA * percentage);


        }

    }

}

TrianglePiece.prototype.addAnimation = function(line, col){

    let dl = line - this.line;
    let dc = col - this.column;

    let angle = Math.atan2(dc,dl);

    this.animation = {
        iLine: this.line,
        iCol: this.column,
        iAng: this.ang,
        line: line,
        column: col,
        angle: angle,
        timeElapsed: 0};
    this.animated = true;

}
