/**
 * Triangle - Constructs Triangle
 * @constructor
 * @param {Object} scene - this scene
 * @param {Number} x - coordinate x of first point
 * @param {Number} y - coordinate y of first point

 */
function Board(scene) {
    CGFobject.call(this, scene);
    this.cells=[];

    for (let i = 1; i < 10; i++) {
        for (var j = 1; j < 10; j++) {
            this.cells.push(new Cell(scene,i,j));
        }
    }

};

var degToRad = Math.PI/180;
Board.prototype = Object.create(CGFobject.prototype);
Board.prototype.constructor=Board;


Board.prototype.display = function(){

    for(let i=0; i< this.cells.length; i++){
        this.cells[i].display();
    }

}
