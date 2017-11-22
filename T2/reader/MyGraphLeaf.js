/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(scene,type,args) {
	//	this.nodeID=no;
	switch (type){
		case 'rectangle':
			this.primitive= new Rectangle(scene, args[0], args[1], args[2], args[3]);
		break;

		case 'triangle':
			this.primitive=new Triangle(scene,args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
			break;

		case 'sphere':
			this.primitive=new Sphere(scene,args[0], args[1], args[2]);
			break;

		case 'cylinder':
			this.primitive=new Cylinder(scene, args[0], args[1], args[2],args[3], args[4], args[5], args[6]);
			break;

		case 'patch':
			this.primitive = new Patch (scene, args[0], args[1], args[2]);
			break;

		default:
		break;
	}
}

MyGraphLeaf.prototype.display = function() {
	this.primitive.display();
}

MyGraphLeaf.prototype.amplifyTex = function(amplifierS, amplifierT) {
	this.primitive.amplifyTexture(amplifierS, amplifierT);
}

MyGraphLeaf.prototype.setLineMode = function() {
	this.primitive.setLineMode();
}

MyGraphLeaf.prototype.setFillMode = function() {
	this.primitive.setFillMode();
}
