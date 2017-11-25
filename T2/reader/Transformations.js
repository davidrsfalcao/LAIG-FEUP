/**
 * Load Transformation
 * @constructor
 * @param {Object} scene - this scene
 */

function Transformation(scene) {
    this.scene = scene;

    this.scene.pushMatrix();
    this.scene.loadIdentity();
    this.transformationMatrix = this.scene.getMatrix();
    this.scene.popMatrix();
}

Transformation.prototype.constructor = Transformation;

/**
 * Rotation transformation
 * @param {Number} angle - angle 
 * @param {Number} x - x 
 * @param {Number} y - y 
 * @param {Number} z - z 
 */
Transformation.prototype.rotate = function(angle, x, y, z) {
    this.scene.pushMatrix();
    this.scene.setMatrix(this.transformationMatrix);
    this.scene.rotate(angle*Math.PI/180, x, y, z);
    this.transformationMatrix = this.scene.getMatrix();
    this.scene.popMatrix();
}

/**
 * Translate transformation
 * @param {Number} x - x 
 * @param {Number} y - y 
 * @param {Number} z - z 
 */
Transformation.prototype.translate = function(x, y, z) {
    this.scene.pushMatrix();
    this.scene.setMatrix(this.transformationMatrix);
    this.scene.translate(x, y, z);
    this.transformationMatrix = this.scene.getMatrix();
    this.scene.popMatrix();
}

/**
 * Scale transformation
 * @param {Number} x - x 
 * @param {Number} y - y 
 * @param {Number} z - z 
 */
Transformation.prototype.scale = function(x, y, z) {
    this.scene.pushMatrix();
    this.scene.setMatrix(this.transformationMatrix);
    this.scene.scale(x, y, z);
    this.transformationMatrix = this.scene.getMatrix();
    this.scene.popMatrix();
}

/**
 * Multiply transformations
 * @param transformation
 */
Transformation.prototype.multiply = function(transformation) {
    this.scene.pushMatrix();
    this.scene.setMatrix(this.transformationMatrix);
    this.scene.multMatrix(transformation.getMatrix());
    this.transformationMatrix = this.scene.getMatrix();
    this.scene.popMatrix();
}

/**
 * Get transformation's matrix
 */
Transformation.prototype.getMatrix = function() {
    return this.transformationMatrix;
}