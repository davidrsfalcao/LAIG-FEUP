/**
* Patch
* @constructor
*/

function Patch(scene, uDivisions, vDivisions, ) {
    CGFobject.call(this,scene);

    this.uDivisions = uDivisions;
    this.vDivisions = vDivisions;

    this.initBuffers();
};

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


Patch.prototype.makeSurface = function (id, degree1, degree2, controlvertexes, translation) {
		
	var knots1 = this.getKnotsVector(degree1); // to be built inside webCGF in later versions ()
	var knots2 = this.getKnotsVector(degree2); // to be built inside webCGF in later versions
		
	var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes); // TODO  (CGF 0.19.3): remove knots1 and knots2 from CGFnurbsSurface method call. Calculate inside method.
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	var obj = new CGFnurbsObject(this, getSurfacePoint, uDivisions, vDivisions);
	this.surfaces.push(obj);		
}

