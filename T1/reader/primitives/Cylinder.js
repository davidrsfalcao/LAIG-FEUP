/**
 * Cylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Cylinder(scene, height, base, top, slices, stacks, draw_base, draw_top) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.slices = slices;
    this.stacks = stacks;
    this.height = height;
    this.draw_top = draw_top;
    this.draw_base = draw_base;

    this.baselessCylinder = new BaselessCylinder(scene, height, base, top, slices, stacks);
    this.top = new Circle(scene, slices, top);
    this.bottom = new Circle(scene, slices, base);
};

Cylinder.prototype = Object.create(CGFobject.prototype);
Cylinder.prototype.constructor = Cylinder;

Cylinder.prototype.display = function() {
    this.baselessCylinder.display();

    if (this.draw_top){
        this.scene.pushMatrix();
            this.scene.translate(0, 0, this.height);
            this.top.display();
        this.scene.popMatrix();
    }

    if (this.draw_base){
        this.scene.pushMatrix();
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.scene.scale(-1, -1, 1);
            this.bottom.display();
        this.scene.popMatrix();
    }

}

Cylinder.prototype.amplifyTexture = function(amplifierS, amplifierT) {
  this.baselessCylinder.amplifyTexture(amplifierS, amplifierT);
  this.top.amplifyTexture(amplifierS, amplifierT);
  this.bottom.amplifyTexture(amplifierS, amplifierT);
}
