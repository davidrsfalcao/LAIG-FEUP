/**
 * MyGraphNode class, representing an intermediate node in the scene graph.
 * @constructor
**/

function MyGraphNode(graph, nodeID) {
    this.graph = graph;

    this.nodeID = nodeID;
    
    // IDs of child nodes.
    this.children = [];

    // IDs of child nodes.
    this.leaves = [];

    // The material ID.
    this.materialID = null ;

    // The texture ID.
    this.textureID = null ;

    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);
}

/**
 * Adds the reference (ID) of another node to this node's children array.
 */
MyGraphNode.prototype.addChild = function(nodeID) {
    this.children.push(nodeID);
}

/**
 * Adds a leaf to this node's leaves array.
 */
MyGraphNode.prototype.addLeaf = function(leaf) {
    this.leaves.push(leaf);
}

/**
 * Adds a leaf to this node's leaves array.
 */
MyGraphNode.prototype.display = function(fatherMaterial) {
	this.graph.scene.pushMatrix();
    this.graph.scene.multMatrix(this.transformMatrix);
	var materialToUse = fatherMaterial;
	if(this.materialID != "null")
		materialToUse = this.materialID;
	
	if(this.textureID != "null"){
		if(this.textureID === "clear"){
			this.graph.materials[materialToUse].setTexture(null);
		} else {
			this.graph.materials[materialToUse].setTexture(this.graph.textures[this.textureID][0]);
			//this.graph.materials[materialToUse].setTextureWrap(this.graph.textures[this.textureID][1], this.graph.textures[this.textureID][2]);
		}
	}
	this.graph.materials[materialToUse].apply();
	
	for(var i=0; i<this.leaves.length; i++){
		this.leaves[i].display();
	}
	for(var i=0; i<this.children.length; i++){
		this.graph.nodes[this.children[i]].display(materialToUse);
	}
	this.graph.scene.popMatrix();
}





