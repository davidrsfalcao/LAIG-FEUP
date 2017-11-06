/**
* Rectangle
* @constructor
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

      this.primitiveType = this.scene.gl.TRIANGLES;

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

Rectangle.prototype.amplifyTexture = function(amplifierS, amplifierT) {
    for (let i = 0; i < this.originalTexCoords.length; i += 2) {
        this.texCoords[i] = this.originalTexCoords[i] / amplifierS;
        this.texCoords[i + 1] = this.originalTexCoords[i + 1] / amplifierT;
    }

    this.updateTexCoordsGLBuffers();
};
