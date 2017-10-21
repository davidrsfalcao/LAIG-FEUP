/**
* Patch
* @constructor
*/

function Patch(scene, degree1, degree2, controlvertexes) {
  	var knots1 = this.getKnotsVector(degree1); // to be built inside webCGF in later versions ()
	var knots2 = this.getKnotsVector(degree2); // to be built inside webCGF in later versions

	var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes); // TODO  (CGF 0.19.3): remove knots1 and knots2 from CGFnurbsSurface method call. Calculate inside method.
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

		this.surface = new CGFnurbsObject(scene, getSurfacePoint, degree1, degree2);

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

Patch.prototype.amplifyTexture = function(amplifierS, amplifierT) {
    //DO nothing
}

Patch.prototype.display = function() {

    //var i=0;
    //var length = this.surfaces.length;

    //for(i=0; i< length; i++){
        this.surface.display();
    //}

}
