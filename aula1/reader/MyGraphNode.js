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
MyGraphNode.prototype.display = function(fatherMaterial, fatherTexture, s, t) {
	this.graph.scene.pushMatrix();
    this.graph.scene.multMatrix(this.transformMatrix);
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

	for(var i=0; i<this.leaves.length; i++){

        if (amplifierS == null){
            amplifierS = 1;
        }
        if (amplifierT == null){
            amplifierT = 1;
        }
        this.leaves[i].amplifyTex(amplifierS,amplifierT);

		this.leaves[i].display();
	}
	for(var i=0; i<this.children.length; i++){
		this.graph.nodes[this.children[i]].display(materialToUse, textureToUse, amplifierS, amplifierT);
	}
	this.graph.scene.popMatrix();
}

