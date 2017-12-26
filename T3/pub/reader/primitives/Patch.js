/**
* Patch - Constructs Patch
* @constructor
* @param {Object} scene - this scene
* @param {Number} udivs - u divisions
* @param {Number} vdivs - v divisions
* @param {Array} controlvertexes - controlvertexes
*/

function Patch(scene, udivs, vdivs, controlvertexes) {

    this.scene = scene;
    var tmp = controlvertexes.slice();
    var degree1 = tmp.length - 1;
    var degree2 = tmp[0].length - 1;

    var knots1 = this.getKnotsVector(degree1); // to be built inside webCGF in later versions ()
    var knots2 = this.getKnotsVector(degree2); // to be built inside webCGF in later versions

	var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes); // TODO  (CGF 0.19.3): remove knots1 and knots2 from CGFnurbsSurface method call. Calculate inside method.
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	this.surface = new CGFnurbsObject(scene, getSurfacePoint, udivs, vdivs);
    this.surface.primitiveType = this.scene.gl.TRIANGLES;
};

Patch.prototype = Object.create(CGFobject.prototype);
Patch.prototype.constructor = Patch;


Patch.prototype.getKnotsVector = function(degree) { // TODO (CGF 0.19.3): add to CGFnurbsSurface

	var v = new Array();
	for (var i=0; i<=degree; i++) {
		v.push(0);
	}
	for (var i=0; i<=degree; i++) {
		v.push(1);
	}
	return v;
}

/**
 * Amplifies the texture according to the s and t variables.
 * The cylinder body does not need amplifying as it is a quadric surface.
 * Even though it does not do anything, it needs to be present due to
 * inheritance.
 */
Patch.prototype.amplifyTexture = function(amplifierS, amplifierT) {
    //DO nothing
}

/**
 * Display Patch
 */
Patch.prototype.display = function() {
    this.surface.display();

}

/**
 * Apply setLineMode function to Patch
 */
Patch.prototype.setLineMode = function(){
    this.surface.primitiveType=this.scene.gl.LINES;
}

/**
 * Apply setFillMode function to Patch
 */
Patch.prototype.setFillMode = function(){
    this.surface.primitiveType=this.scene.gl.TRIANGLES;
}
