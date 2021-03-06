/**
* Rectangle - Constructs Rectangle
* @constructor
* @param {Object} scene - this scene
* @param {Number} left_top_x - coordinate x of letf corner of rectangle
* @param {Number} left_top_y - coordinate y of letf corner of rectangle
* @param {Number} right_bottom_x - coordinate x of right corner of rectangle
* @param {Number} right_bottom_y - coordinate y of right corner of rectangle
*/

function Rectangle(scene, left_top_x, left_top_y, right_bottom_x, right_bottom_y) {
    CGFobject.call(this,scene);

    this.left_top_x = left_top_x;
    this.left_top_y = left_top_y;
    this.right_bottom_x = right_bottom_x;
    this.right_bottom_y = right_bottom_y;

    this.width = right_bottom_x - left_top_x;
    this.height = left_top_y - right_bottom_y;

    this.initBuffers();
};

Rectangle.prototype = Object.create(CGFobject.prototype);
Rectangle.prototype.constructor = Rectangle;

/**
 * Init Buffers
 */
Rectangle.prototype.initBuffers = function() {

    this.vertices = [
      this.left_top_x, this.left_top_y, 0,
      this.right_bottom_x, this.left_top_y, 0,
      this.right_bottom_x, this.right_bottom_y, 0,
      this.left_top_x, this.right_bottom_y, 0
      ];

      this.indices = [
          0, 3, 2,
          2, 1, 0,

      ];

      this.normals = [
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1
      ];

    this.originalTexCoords = [
        0,0,
        this.width,0,
        this.width,this.height,
        0,this.height,
    ];

    this.texCoords = this.originalTexCoords.slice();
    this.primitiveType = this.scene.gl.TRIANGLES;


    this.initGLBuffers();
};

/**
 * Amplifies the texture according to the s and t variables.
 * The cylinder body does not need amplifying as it is a quadric surface.
 * Even though it does not do anything, it needs to be present due to
 * inheritance.
 */
Rectangle.prototype.amplifyTexture = function(amplifierS, amplifierT) {
    for (let i = 0; i < this.originalTexCoords.length; i += 2) {
        this.texCoords[i] = this.originalTexCoords[i] / amplifierS;
        this.texCoords[i + 1] = this.originalTexCoords[i + 1] / amplifierT;
    }

    this.updateTexCoordsGLBuffers();
};

/**
 * Apply setLineMode function to Rectangle
 */
Rectangle.prototype.setLineMode = function(){
    this.primitiveType=this.scene.gl.LINES;
}

/**
 * Apply setFillMode function to Rectangle
 */
Rectangle.prototype.setFillMode = function(){
    this.primitiveType=this.scene.gl.TRIANGLES;
}
