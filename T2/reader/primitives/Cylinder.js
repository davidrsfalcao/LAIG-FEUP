 /**
 * Cylinder - Constructs Cylinder
 * @constructor
 * @param {Object} scene - this scene
 * @param {Number} height - cylinder's height
 * @param {Number} base - cylinder's base
 * @param {Number} top - cylinder's top
 * @param {Number} slices - cylinder's slices
 * @param {Number} stacks - cylinder's stacks
 * @param {Boolean} draw_base - if base is designed
 * @param {Boolean} draw_top - if top is designed
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

/**
 * Display Cylinder
 */
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

/**
 * Amplifies the texture according to the s and t variables.
 * The cylinder body does not need amplifying as it is a quadric surface.
 * Even though it does not do anything, it needs to be present due to
 * inheritance.
 */
Cylinder.prototype.amplifyTexture = function(amplifierS, amplifierT) {
  this.baselessCylinder.amplifyTexture(amplifierS, amplifierT);
  this.top.amplifyTexture(amplifierS, amplifierT);
  this.bottom.amplifyTexture(amplifierS, amplifierT);
}

/**
 * Apply setLineMode function to Cylinder's components
 */
Cylinder.prototype.setLineMode = function(){
    this.baselessCylinder.primitiveType=this.scene.gl.LINES;
    this.top.primitiveType=this.scene.gl.LINES;
    this.bottom.primitiveType=this.scene.gl.LINES;
}

/**
 * Apply setFillMode function to Cylinder's components
 */
Cylinder.prototype.setFillMode = function(){
    this.baselessCylinder.primitiveType=this.scene.gl.TRIANGLES;
    this.top.primitiveType=this.scene.gl.TRIANGLES;
    this.bottom.primitiveType=this.scene.gl.TRIANGLES;
}
