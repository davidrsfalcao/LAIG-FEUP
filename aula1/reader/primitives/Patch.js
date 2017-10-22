/**
* Patch
* @constructor
*/

function Patch(scene, udivs, vdivs, controlvertexes) {

    var tmp = controlvertexes.slice();
    var a = tmp.length - 1;
    var b = tmp[0].length - 1;

    var knots1 = this.getKnotsVector(a); // to be built inside webCGF in later versions ()
    var knots2 = this.getKnotsVector(b); // to be built inside webCGF in later versions

	var nurbsSurface = new CGFnurbsSurface(a, b, knots1, knots2, controlvertexes); // TODO  (CGF 0.19.3): remove knots1 and knots2 from CGFnurbsSurface method call. Calculate inside method.
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	this.surface = new CGFnurbsObject(scene, getSurfacePoint, udivs, vdivs);

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


    this.surface.display();

}
