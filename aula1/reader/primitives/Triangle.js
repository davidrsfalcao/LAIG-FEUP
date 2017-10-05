/**
 * Triangle
 * @constructor
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
 Triangle.prototype.constructor = Triangle;

 Triangle.prototype.initBuffers = function() {

 	this.vertices = [
 	this.x1, this.y1, this.z1,
 	this.x2, this.y2, this.z2,
 	this.x3, this.y3, this.z3,
 	];

 	this.indices = [
 	0, 1, 2,
 	];

	var a = Math.sqrt((this.x1-this.x2)*(this.x1-this.x2) + (this.y1-this.y2)*(this.y1-this.y2) + (this.z1-this.z2)*(this.z1-this.z2));
    var b = Math.sqrt((this.x2-this.x3)*(this.x2-this.x3) + (this.y2-this.y3)*(this.y2-this.y3) + (this.z2-this.z3)*(this.z2-this.z3));
    var c = Math.sqrt((this.x3-this.x1)*(this.x3-this.x1) + (this.y3-this.y1)*(this.y3-this.y1) + (this.z3-this.z1)*(this.z3-this.z1));


    var cosC = (a*a + b*b - c*c)/ (2*a*b);

    var sinC = Math.sqrt(1- cosC*cosC);

    this.texCoords = [a-b*cosC, b*sinC,
        0,0,
        a,0];

    var vec1 = {}, vec2 = {}, vecf = {};
    vec1.x = (this.x3-this.x1) / c;
	vec1.y = (this.y3-this.y1) / c;
	vec1.z = (this.z3-this.z1) / c;
    vec2.x = (this.x2-this.x1) / a;
	vec2.y = (this.y2-this.y1) / a;
	vec2.z = (this.z2-this.z1) / a;

    vecf.x = vec1.y*vec2.z - vec1.z*vec2.y;
    vecf.y = vec1.z*vec2.x - vec1.x*vec2.z;
    vecf.z = vec1.x*vec2.y - vec1.y*vec2.x;

    this.normals = [
        0,0,1,
        0, 0, 1,
        0, 0, 1,
    ];

 	this.primitiveType = this.scene.gl.TRIANGLES;


 	this.initGLBuffers();
 };

Triangle.prototype.amplifyTexture = function(amplifierS, amplifierT) {

     this.updateTexCoordsGLBuffers();
 }
