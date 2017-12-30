/**
 * Triangle - Constructs Triangle
 * @constructor
 * @param {Object} scene - this scene
 * @param {Number} x - coordinate x of first point
 * @param {Number} y - coordinate y of first point

 */
function CylinderPiece(scene, line, column, player) {
    CGFobject.call(this, scene);
    this.scene=scene;
    this.line=line;
    this.column=column;
    this.posL = line;
    this.posC = column

    this.height = 0;
    this.out_pos = {line: line, column: column};

    this.player=player;

    this.inGame = false;
    this.animationTime = 1; // 1s
    this.animation = null; //{line: ll, column: cc, timeElapsed: time};
    this.animated = false;

    this.cil = new Cylinder(this.scene, 2, 1, 1, 10, 10, 1, 1);

    this.scene.cylinders.push(this);

};


CylinderPiece.prototype = Object.create(CGFobject.prototype);
CylinderPiece.prototype.constructor=CylinderPiece;

CylinderPiece.prototype.display = function(){

    if(this.player==1)
        this.scene.tex1.apply();
    else
        this.scene.tex2.apply();


    let dX = (this.posC-5)*10;
    let dY = (this.posL-5)*10;

    this.scene.pushMatrix();
        this.scene.translate(dX,dY,-this.height+1);
        this.scene.pushMatrix();
            this.cil.display();
        this.scene.popMatrix();
    this.scene.popMatrix();
}

CylinderPiece.prototype.update = function(deltaT){
    if(this.animated){
        this.animation.timeElapsed += deltaT;

        if(this.animation.timeElapsed >= this.animationTime){
            this.posL = this.animation.line;
            this.posC = this.animation.column;
            this.height = 0;
            this.animated = false;
            this.animation = null;
        }
        else {
            let deltaL = this.animation.line - this.animation.iLine;
            let deltaC = this.animation.column - this.animation.iCol;
            let percentage = this.animation.timeElapsed/this.animationTime;

            this.posL = this.animation.iLine + (deltaL * percentage);
            this.posC = this.animation.iCol + (deltaC * percentage);
            this.height = Math.sin(Math.PI * percentage)*10;


        }

    }

}

CylinderPiece.prototype.addAnimation = function(l, c, line, col){

    this.animation = {
        iLine: this.posL,
        iCol: this.posC,
        line: line,
        column: col,
        timeElapsed: 0
    };

    this.animated = true;
    this.inGame = true;
    this.line = l;
    this.column = c;

}

CylinderPiece.prototype.getOut = function(){

    this.animation = {
        iLine: this.posL,
        iCol: this.posC,
        line: this.out_pos.line,
        column: this.out_pos.column,
        timeElapsed: 0};
    this.animated = true;
    this.inGame = false;
    this.line = this.out_pos.line;
    this.column = this.out_pos.column;

}
