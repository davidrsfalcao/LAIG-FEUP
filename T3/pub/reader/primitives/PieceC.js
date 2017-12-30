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


    for(let line = 5; line <= 9; line+=0.25) {
        for (let col = -1.3; col <= -0.3; col += 0.25) {
            let cil = new CylinderPiece(scene,line,col,2);
            this.cylinders.push(cil);
        }
    }

    for(let line = 5; line >= 1; line-=0.25) {
        for (let col = 10.3; col <= 11.3; col += 0.25) {
            let cil = new CylinderPiece(scene,line,col,1);
            this.cylinders.push(cil);
        }
    }


};

var degToRad = Math.PI/180;
PieceC.prototype = Object.create(CGFobject.prototype);
PieceC.prototype.constructor=Piece;


PieceC.prototype.display = function(){

    for(let i=0; i< this.cylinders.length; i++){
        this.cylinders[i].display();
    }

}
