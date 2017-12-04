/**
 * MyGraphNode class, representing an intermediate node in the scene graph.
 * @constructor
 * @param {Object} graph - scene's graph
 * @param {String} nodeId - id of this node
 * @param {Boolean} selected - true if this node is selected on XML file, false otherwise
**/

function MyGraphNode(graph, nodeID, selected) {
    this.graph = graph;

    this.nodeID = nodeID;

    // IDs of child nodes.
    this.children = [];

    // IDs of child nodes.
    this.leaves = [];

    // IDs of animations
    this.animations = [];

    this.currAnimation = 0;

    // The material ID.
    this.materialID = null ;

    // The texture ID.
    this.textureID = null ;

    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);

    this.transformMatrixAnimations = mat4.create();
    mat4.identity(this.transformMatrixAnimations);

    if (selected == "true"){
        this.selectable = true;
    }
    else {
        this.selectable = false;
    }
    this.flag_begin = true;

}

/**
 * Adds the reference (ID) of another node to this node's children array.
 * @param {String} nodeID - nodeID
 */
MyGraphNode.prototype.addChild = function(nodeID) {
    this.children.push(nodeID);
}

/**
 * Adds a leaf to this node's leaves array.
 * @param {Object} leaf - leaf
 */
MyGraphNode.prototype.addLeaf = function(leaf) {
    this.leaves.push(leaf);
}

/**
 * Adds a animation to this node's animations array.
 * @param {String} anim - id of animation to be added 
 */
MyGraphNode.prototype.addAnimation = function(anim) {

    if (this.animations.length == 0)
        anim.inUse = true;

    this.animations.push(anim);
}

/**
 * Display this node
 * @param {String} fatherMaterial - fatherMaterial's id
 * @param {String} fatherTexture - fatherTexture's id
 * @param {Number} s - scalar s 
 * @param {Number} t - scalar t
 * @param {Boolean} selected - true if this node is selected on XML file, false otherwise
 * 
 */
MyGraphNode.prototype.display = function(fatherMaterial, fatherTexture, s, t, selected) {

    var selec, selec1;
    if(this.selectable && this.graph.scene.selectableValues[this.nodeID] && this.graph.scene.shadderChosen != 0){
        selec = true;
    }
    else {
        selec = false;
    }

    if(selected || (this.selectable && this.graph.scene.selectableValues[this.nodeID])){
        selec1 = true;
    }
    else selec1 = false;

	this.graph.scene.pushMatrix();
    this.graph.scene.multMatrix(this.transformMatrixAnimations);
    var materialToUse = fatherMaterial;
    var textureToUse = fatherTexture;
    var amplifierS, amplifierT;

	if(this.materialID != "null")
		materialToUse = this.materialID;

	if(this.textureID != "null"){
		if(this.textureID === "clear"){
			this.graph.materials[materialToUse].setTexture(null);
		} else {
			this.graph.materials[materialToUse].setTexture(this.graph.textures[this.textureID][0]);
            amplifierS = this.graph.textures[this.textureID][1];
            amplifierT = this.graph.textures[this.textureID][2];
		}
	}
    else {
        textureToUse = this.textureID;
        amplifierS = s;
        amplifierT = t;
    }
	this.graph.materials[materialToUse].apply();

    if (selec){
        this.graph.scene.setActiveShader(this.graph.scene.testShaders[this.graph.scene.shadderChosen]);
    }


	for(var i=0; i<this.leaves.length; i++){

        if (amplifierS == null){
            amplifierS = 1;
        }
        if (amplifierT == null){
            amplifierT = 1;
        }
        this.leaves[i].amplifyTex(amplifierS,amplifierT);

        if(this.graph.scene.wireframe && selec1){
            this.leaves[i].setLineMode();
            this.leaves[i].display();
            this.leaves[i].setFillMode();
        }
        else this.leaves[i].display();
	}

	for(var i=0; i<this.children.length; i++){
        if(this.graph.scene.wireframe && selec1){
            this.graph.nodes[this.children[i]].setLineMode();
            this.graph.nodes[this.children[i]].display(materialToUse, textureToUse, amplifierS, amplifierT, selec1);
            this.graph.nodes[this.children[i]].setFillMode();
        }
        else this.graph.nodes[this.children[i]].display(materialToUse, textureToUse, amplifierS, amplifierT, selec1);
    }
    if (selec){
        this.graph.scene.setActiveShader(this.graph.scene.defaultShader);
    }
	this.graph.scene.popMatrix();
}

/**
 * Update nodes
 * @param {Number} deltaT - time
 */
MyGraphNode.prototype.update = function(deltaT) {

    if(this.flag_begin && this.selectable == true){
        for(var i=0; i<this.children.length; i++){
            this.graph.nodes[this.children[i]].selectable = true;
        }
        this.flag_begin = false;
    }

    this.transformMatrixAnimations = this.getMatrix(deltaT);

    for(var i=0; i<this.children.length; i++){
        this.graph.nodes[this.children[i]].update(deltaT);
    }
}

/**
 * Update transformation's matrix 
 * @param {Number} deltaT - time
 */
MyGraphNode.prototype.getMatrix = function(deltaT) {
	if (this.animations.length == 0)
        return this.transformMatrix;

    if(this.animations[this.currAnimation].inUse == false){
        if(this.currAnimation + 1 == this.animations.length)
            return this.transformMatrixAnimations;
        else this.currAnimation++;

        this.animations[this.currAnimation].inUse = true;
    }
	var result = mat4.create();
    mat4.identity(result);
	mat4.multiply(result, this.transformMatrix, this.animations[this.currAnimation].getMatrix(deltaT));

	return result;
}

/**
 * Restart animations
 */
MyGraphNode.prototype.restartAnimation = function() {

    this.transformMatrixAnimations = this.transformMatrix;
    this.currAnimation = 0;
    if (this.animations.length != 0){
        for(var i=0; i<this.animations.length; i++){
            this.animations[i].restartAnimation();
        }
        this.animations[0].inUse = true;
    }

    for(var i=0; i<this.children.length; i++){
        this.graph.nodes[this.children[i]].restartAnimation();
    }

}
/**
 * Apply setLineMode function to every children
 */
MyGraphNode.prototype.setLineMode = function() {
    for(var i=0; i<this.children.length; i++){
        this.graph.nodes[this.children[i]].setLineMode();
    }

    for(var i=0; i<this.leaves.length; i++){
        this.leaves[i].setLineMode();
    }
}

/**
 * Apply setFillMode function to every children
 */
MyGraphNode.prototype.setFillMode = function() {
    for(var i=0; i<this.children.length; i++){
        this.graph.nodes[this.children[i]].setFillMode();
    }

    for(var i=0; i<this.leaves.length; i++){
        this.leaves[i].setFillMode();
    }
}
