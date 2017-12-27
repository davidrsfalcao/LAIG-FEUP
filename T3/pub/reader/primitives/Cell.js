/**
 * Triangle - Constructs Triangle
 * @constructor
 * @param {Object} scene - this scene
 * @param {Number} x - coordinate x of first point
 * @param {Number} y - coordinate y of first point

 */
function Cell(scene, column, line) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.line = line;
    this.column = column;
    this.player = 0;
    this.rect = new Rectangle(scene, -0.5, 0.5, 0.5, -0.5);
    this.scene.cells.push(this);

};

Cell.prototype = Object.create(CGFobject.prototype);
Cell.prototype.constructor=Cell;


Cell.prototype.display = function(){
    this.scene.cellTex.apply();
    this.scene.pushMatrix();
    let dX = (this.line-5)*10;
    let dY = (this.column-5)*10;
    this.scene.translate(dY,0,dX);

    this.scene.pushMatrix();
    this.scene.scale(10,1,10);
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.rect.display();
    this.scene.popMatrix();

    this.scene.popMatrix();

}
