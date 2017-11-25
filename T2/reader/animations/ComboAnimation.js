/**
 * ComboAnimation
 * @constructor
 * @param {Object} scene - this scene
 * @param {String} id - animation id
 * @param {Array} animations - animations that make up the set of animations
 */
function ComboAnimation(scene, id, animations) {
    Animation.call(this, scene, id);

    this.animations = animations;
    this.counter = -1;

}

ComboAnimation.prototype = Object.create(Animation.prototype);
ComboAnimation.prototype.constructor = ComboAnimation;

/**
 * Get transformation matrix after animation is applied
 * @param {Number} deltaT - time
 */
ComboAnimation.prototype.getMatrix = function(deltaT) {
	var m = mat4.create();
    mat4.identity(m);

    this.updateAnimation(deltaT);
    m = this.animations[this.counter].getMatrix(deltaT);


	return m;
}

/**
 * Update Animation 
 * @param {Number} deltaTime - time
 */
ComboAnimation.prototype.updateAnimation = function(deltaTime){

    if (this.animations.length == 0)
        return;

    if (this.counter == -1){
        for(var i = 0; i < this.animations.length; i++){
            this.animations[i].restartAnimation();
        }
        this.counter = 0;
        this.animations[this.counter].inUse = true;
    }

    if(this.animations[this.counter].inUse == false){
        if(this.counter + 1 == this.animations.length){
            this.inUse = false;
            return;
        }
        else {
            this.counter++;
            this.animations[this.counter].inUse = true;
        }
    }

}

/**
 * Restart Animation 
 */
ComboAnimation.prototype.restartAnimation = function(){
    this.inUse = false;
    this.counter = -1;
    for(var i = 0; i < this.animations.length; i++){
        this.animations[i].restartAnimation();
    }
}
