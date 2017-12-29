/**
 * Triangle - Constructs Triangle
 * @constructor
 * @param {Object} scene - this scene
 * @param {Number} x - coordinate x of first point
 * @param {Number} y - coordinate y of first point

 */
function PieceC(scene) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.cylinders=[];
    this.scene.cylinders=[];
   
    this.cil1 = new CylinderPiece(scene,1,-1,2);
    //this.cil1 = new TrianglePiece(scene,1,1,"se",2);
    this.cylinders.push(this.cil1);
    this.cil2 = new CylinderPiece(scene,2,-1,2);
    //this.cil2 = new TrianglePiece(scene,1,7,"s",2);
    this.cylinders.push(this.cil2);
    this.cil3 = new CylinderPiece(scene,3,-1,2);
    //this.cil3 = new TrianglePiece(scene,5,9,"w",2);
    this.cylinders.push(this.cil3);
    this.cil4 = new CylinderPiece(scene,4,-1,2);
    //this.cil4 = new TrianglePiece(scene,9,7,"n",2);
    this.cylinders.push(this.cil4);
    this.cil5 = new CylinderPiece(scene,6,11,1);
    //this.cil5 = new TrianglePiece(scene,1,3,"s",1);
    this.cylinders.push(this.cil5);
    //this.cil6 = new TrianglePiece(scene,5,1,"e",1);
    this.cil6 = new CylinderPiece(scene,7,11,1);
    this.cylinders.push(this.cil6);
    //this.cil7 = new TrianglePiece(scene,9,3,"n",1);
    this.cil7 = new CylinderPiece(scene,8,11,1);
    this.cylinders.push(this.cil7);
    this.cil8 = new CylinderPiece(scene,9,11,1);
    //this.cil8 = new TrianglePiece(scene,9,9,"nw",1);
    this.cylinders.push(this.cil8);


};

var degToRad = Math.PI/180;
PieceC.prototype = Object.create(CGFobject.prototype);
PieceC.prototype.constructor=Piece;


PieceC.prototype.display = function(){

    for(let i=0; i< this.cylinders.length; i++){
        this.cylinders[i].display();
    }

}
