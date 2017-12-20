/**
 * Triangle - Constructs Triangle
 * @constructor
 * @param {Object} scene - this scene
 * @param {Number} x - coordinate x of first point
 * @param {Number} y - coordinate y of first point

 */
function Piece(scene) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.pieces=[];

    this.piece1 = new TrianglePiece(scene,1,1,"se",2);
    this.pieces.push(this.piece1);
    this.piece2 = new TrianglePiece(scene,1,7,"s",2);
    this.pieces.push(this.piece2);
    this.piece3 = new TrianglePiece(scene,5,9,"w",2);
    this.pieces.push(this.piece3);
    this.piece4 = new TrianglePiece(scene,9,7,"n",2);
    this.pieces.push(this.piece4);
    this.piece5 = new TrianglePiece(scene,1,3,"s",1);
    this.pieces.push(this.piece5);
    this.piece6 = new TrianglePiece(scene,5,1,"e",1);
    this.pieces.push(this.piece6);
    this.piece7 = new TrianglePiece(scene,9,3,"n",1);
    this.pieces.push(this.piece7);
    this.piece8 = new TrianglePiece(scene,9,9,"nw",1);
    this.pieces.push(this.piece8);


};

var degToRad = Math.PI/180;
Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor=Piece;


Piece.prototype.display = function(){

    for(let i=0; i< this.pieces.length; i++){
        this.pieces[i].display();
    }

}
