function BezierAnimation(scene, id, controlPoints, speed) {
    Animation.call(this, scene, id);
    this.controlPoints = controlPoints;
    this.speed = speed;
    this.counter = 0;

    // this.totalDistance = 0;
    // this.currRotation = 0;
    // this.control = [0,0,0];
    //
    // this.calculateTrajectory();
    //
	// for (var i = 1; i < controlPoints.length; i++)
	// {
	// 	this.totalDistance += this.calculateDistance(controlPoints[i - 1], controlPoints[i]);
    // }
    //
    // this.span= this.totalDistance/speed;
}

BezierAnimation.prototype = Object.create(Animation.prototype);
BezierAnimation.prototype.constructor = BezierAnimation;

BezierAnimation.prototype.getMatrix = function(deltaT) {
	var m = mat4.create();
    mat4.identity(m);

    this.updateAnimation(deltaT);


	return m;
}


BezierAnimation.prototype.calculateDistance = function(p1, p2) {


BezierAnimation.prototype.calculateRotation = function(p1, p2) {

}

BezierAnimation.prototype.calculateTrajectory = function(){

}

BezierAnimation.prototype.updateAnimation = function(deltaTime){


}
