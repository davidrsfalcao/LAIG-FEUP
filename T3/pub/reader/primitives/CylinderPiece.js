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
    this.height = 0;

    this.player=player;

    this.inGame = false;
    this.animationTime = 1; // 1s
    this.animation = null; //{line: ll, column: cc, timeElapsed: time};
    this.animated = false;

    this.cil = new Cylinder(this.scene, 3, 1, 1, 10, 10, 1, 1);
  
    this.scene.cylinders.push(this);

};


CylinderPiece.prototype = Object.create(CGFobject.prototype);
CylinderPiece.prototype.constructor=CylinderPiece;

CylinderPiece.prototype.display = function(){

    if(this.player==1)
        this.scene.tex1.apply();
    else
        this.scene.tex2.apply();

    
    let dX = (this.column-5)*10;
    let dY = (this.line-5)*10;

    this.scene.pushMatrix();
    this.scene.translate(dX,dY,this.height);
    this.scene.pushMatrix();

    this.cil.display();
    this.scene.popMatrix();
    this.scene.popMatrix();
}
