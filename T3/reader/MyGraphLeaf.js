/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
 * @param {Object} scene - represents the scene
 * @param {String} type - represents type of leaf's primitive
 * @param {Array} args - the args that will be needed to create the leaf's primitives
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

/**
 * Display primitives
 */
MyGraphLeaf.prototype.display = function() {
	this.primitive.display();
}

/**
 * Function that amplify scalars values in textures
 * @param {Number} amplifierS -  update S value in texture
 * @param {Number} amplifierT - update T value in texture
 */
MyGraphLeaf.prototype.amplifyTex = function(amplifierS, amplifierT) {
	this.primitive.amplifyTexture(amplifierS, amplifierT);
}

/**
 * SetLineMode in primitives
 */
MyGraphLeaf.prototype.setLineMode = function() {
	this.primitive.setLineMode();
}


/**
 * SetFillMode in primitives
 */
MyGraphLeaf.prototype.setFillMode = function() {
	this.primitive.setFillMode();
}
