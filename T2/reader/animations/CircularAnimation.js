function CircularAnimation(scene, id, center, radius, initialAngle, rotationAngle, speed) {
    Animation.call(this, scene, id);

    this.radius = radius;
    this.radAng = Math.PI / 180;
    this.initialAngle = initialAngle * this.radAng;
    this.rotationAngle = rotationAngle * this.radAng;
    this.angularSpeed = speed / radius;
    this.currTime = 0;
    this.currAngle = 0;
    this.centerX = center[0];
    this.centerY = center[1];
    this.centerZ = center[2];

    console.log("OLAA");
    console.log(this.scene);

}

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.updateAnimation = function(deltaTime){

    this.currAngle += this.angularSpeed * deltaTime/1000;

    if ( this.currAngle >= this.rotationAngle) {
        this.currAngle = this.rotationAngle;
        this.inUse = false;
    }
}
CircularAnimation.prototype.getMatrix = function(t){

    return mat4.create();
}


CircularAnimation.prototype.display = function(){
    this.scene.translate(this.centerX, this.centerY, this.centerZ);
    this.scene.translate(this.radius * Math.cos(this.initialAngle + this.currAngle), 0, -this.radius * Math.sin(this.initialAngle + this.currAngle));
    this.scene.rotate(Math.PI + this.initialAngle + this.currAngle, 0, 1, 0);
}
