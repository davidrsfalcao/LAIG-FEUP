/**
 * Animation - represents an animation
 * @constructor
 * @param {Object} scene - this scene
 * @param {String} id - animation id
 */
function Animation(scene, id) {
    this.scene = scene;
    this.id = id;
    this.inUse = false;
}

Animation.prototype.constructor = Animation;

/**
 * Assign true to inUse variable 
 */
Animation.prototype.begin = function(){
    this.inUse = true;
}
