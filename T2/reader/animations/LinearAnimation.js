function LinearAnimation(scene, id, controlPoints, speed) {
    Animation.call(this, scene, id);

    this.controlPoints = controlPoints;
    this.speed = speed;
    this.counter = 0;
    this.x = controlPoints[0][0];
    this.y = controlPoints[0][1];
    this.z = controlPoints[0][2];
    this.distX;
    this.distY;
    this.distZ;
    this.rotationAngle;
}

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.updateAnimation = function(deltaTime){

    if (this.x == this.x2){
        calculateTrajectory();
        return;
    }

    if (this.distX > 0)
        this.x += this.speed_x * deltaTime / 1000;
    else this.x -= this.speed_x * deltaTime / 1000;

    if (this.distY > 0)
        this.y += this.speed_y * deltaTime / 1000;
    else this.y -= this.speed_y * deltaTime / 1000;

    if (this.distZ > 0)
        this.z += this.speed_z * deltaTime / 1000;
    else this.z -= this.speed_z * deltaTime / 1000;

}

LinearAnimation.prototype.display = function(){

    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.rotationAngle, 0, 1, 0);

}

LinearAnimation.prototype.calculateTrajectory = function(){
    this.x1 = this.controlPoints[this.counter][0];
    this.y1 = this.controlPoints[this.counter][1];
    this.z1 = this.controlPoints[this.counter][2];

    if (counter + 1 <  this.controlPoints.lenght){
        this.x2 = this.controlPoints[this.counter+1][0];
        this.y2 = this.controlPoints[this.counter+1][1];
        this.z2 = this.controlPoints[this.counter+1][2];
    }
    else {
        inUse = false;
        return;
    }

    this.distX = this.x2-this.x1;
    this.distY = this.y2-this.y1;
    this.distZ = this.z2-this.z1;

    this.rotationAngle = Math.atan(this.distY/this.distX);

    this.speed_x = Math.cos(this.speed);
    this.speed_y = Math.sin(this.speed);
    this.speed_z = Math.cos(this.speed);



    counter++;

}
