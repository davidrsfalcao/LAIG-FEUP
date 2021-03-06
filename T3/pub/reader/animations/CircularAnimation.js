/**
 * CircularAnimation
 * @constructor
 * @param {Object} scene - this scene
 * @param {String} id - animation id
 * @param {Array} center - coordinates of the animation center
 * @param {Number} radius - radius of animation
 * @param {Number} initialAngle - animation's initial angle
 * @param {Number} rotationAngle - animation's rotation angle
 * @param {Number} speed - animation speed
 
 */
function CircularAnimation(scene, id, center, radius, initialAngle, rotationAngle, speed) {
    Animation.call(this, scene, id);

    this.radius = radius;
    this.radAng = Math.PI / 180;
    this.initialAngle = initialAngle * this.radAng;
    this.rotationAngle = rotationAngle * this.radAng;
    this.angularSpeed = speed / radius;
    this.currAngle = 0;
    this.x = center[0];
    this.y = center[1];
    this.z = center[2];

}

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

/**
 * Update Animation 
 * @param {Number} deltaTime - time
 */
CircularAnimation.prototype.updateAnimation = function(deltaTime){

    this.currAngle += this.angularSpeed * deltaTime/1000;

    if ( this.currAngle >= this.rotationAngle) {
        this.currAngle = this.rotationAngle;
        this.inUse = false;
    }
}

/**
 * Get transformation matrix after animation is applied
 * @param {Number} deltaT - time
 */
CircularAnimation.prototype.getMatrix = function(deltaT){
    var m =  mat4.create();

    this.updateAnimation(deltaT);
    mat4.translate(m, m, [this.x, this.y, this.z]);
    var a = this.radius * Math.cos(this.initialAngle + this.currAngle);
    var b = 0;
    var c = -this.radius * Math.sin(this.initialAngle + this.currAngle);
    mat4.translate(m, m , [a, b, c]);
    mat4.rotate(m, m, Math.PI + this.initialAngle + this.currAngle, [0, 1, 0]);

    return m;
}

/**
 * Restart Animation 
 */
CircularAnimation.prototype.restartAnimation = function(deltaT){
    this.currAngle = 0;
    this.inUse = false;
}
