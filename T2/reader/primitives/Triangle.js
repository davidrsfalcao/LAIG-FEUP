/**
 * Triangle - Constructs Triangle
 * @constructor
 * @param {Object} scene - this scene
 * @param {Number} x1 - coordinate x of first point
 * @param {Number} y1 - coordinate y of first point
 * @param {Number} z1 - coordinate z of first point
 * @param {Number} x2 - coordinate x of second point
 * @param {Number} y2 - coordinate y of second point
 * @param {Number} z2 - coordinate z of second point
 * @param {Number} x3 - coordinate x of third point
 * @param {Number} y3 - coordinate y of third point
 * @param {Number} z3 - coordinate z of third point
 */
function Triangle(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
    CGFobject.call(this,scene);

    this.x1 = x1;
	this.x2 = x2;
	this.x3 = x3;
	this.y1 = y1;
	this.y2 = y2;
	this.y3 = y3;
	this.z1 = z1;
	this.z2 = z2;
	this.z3 = z3;

    this.initBuffers();
};

Triangle.prototype = Object.create(CGFobject.prototype);
Triangle.prototype.constructor=Triangle;

/**
 * Init Buffers
 */
Triangle.prototype.initBuffers = function () {

    this.vertices = [
            this.x3, this.y3, this.z3,
            this.x2,this.y2,this.z2,
            this.x1,this.y1,this.z1
        ];

    this.indices = [
            2, 1, 0
        ];

    let v1 = vec3.fromValues(this.x2-this.x1 , this.y2-this.y1, this.z2-this.z1);
    let v2 = vec3.fromValues(this.x3 - this.x1, this.y3 - this.y1, this.z3 - this.z1);
    let normal = vec3.create();
    vec3.cross(normal, v1,v2);

    this.normals = [
        normal[0],normal[1],normal[2],
        normal[0],normal[1],normal[2],
        normal[0],normal[1],normal[2]
    ];

    let c = Math.sqrt((this.x1-this.x2)*(this.x1-this.x2) + (this.y1-this.y2)*(this.y1-this.y2) + (this.z1-this.z2)*(this.z1-this.z2));
    let a = Math.sqrt((this.x2-this.x3)*(this.x2-this.x3) + (this.y2-this.y3)*(this.y2-this.y3) + (this.z2-this.z3)*(this.z2-this.z3));
    let b = Math.sqrt((this.x1-this.x3)*(this.x1-this.x3) + (this.y1-this.y3)*(this.y1-this.y3) + (this.z1-this.z3)*(this.z1-this.z3));

    let cosB = (a*a - b*b + c*c)/(2*a*c);
    let sinB = Math.sqrt(1 - cosB*cosB);

    let h = a*sinB;

    let aux = [c,a,b,h];

    let max = Math.max.apply(Math,aux);

    b = b/max;
    c = c/max;
    a = a/max;
    h = h/max;

    this.originalTexCoords = [c-a*cosB,1-h,c,1,0,1];

    this.texCoords = this.originalTexCoords.slice();

    this.primitiveType=this.scene.gl.TRIANGLES;
    this.initGLBuffers();

};

/**
 * Amplifies the texture according to the s and t variables.
 * The cylinder body does not need amplifying as it is a quadric surface.
 * Even though it does not do anything, it needs to be present due to
 * inheritance.
 */
Triangle.prototype.amplifyTexture = function(s,t){
    for (var i = 0; i < this.texCoords.length; i += 2) {
        this.texCoords[i] = this.originalTexCoords[i] / s;
        this.texCoords[i + 1] = this.originalTexCoords[i+1] / t;
    }
    this.updateTexCoordsGLBuffers();
}

/**
 * Apply setLineMode function to Triangle
 */
Triangle.prototype.setLineMode = function(){
    this.primitiveType=this.scene.gl.LINES;
}

/**
 * Apply setFillMode function to Triangle
 */
Triangle.prototype.setFillMode = function(){
    this.primitiveType=this.scene.gl.TRIANGLES;
}
