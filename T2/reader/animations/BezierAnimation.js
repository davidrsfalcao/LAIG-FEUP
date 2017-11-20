function BezierAnimation(scene, id, controlPoints, speed) {
    Animation.call(this, scene, id);
    this.speed = speed;
    this.counter = 0;

    this.pt1 = controlPoints[0];
    this.pt2 = controlPoints[1];
    this.pt3 = controlPoints[2];
    this.pt4 = controlPoints[3];

    this.currRotation = 0
    this.x = this.pt1[0];
    this.y = this.pt1[1];
    this.z = this.pt1[2];
    this.t = 0;

    this.calculateDistance();

}

BezierAnimation.prototype = Object.create(Animation.prototype);
BezierAnimation.prototype.constructor = BezierAnimation;

BezierAnimation.prototype.getMatrix = function(deltaT) {
	var m = mat4.create();
    mat4.identity(m);

    this.updateAnimation(deltaT);
    mat4.translate(m, m, [this.x, this.y, this.z]);
    mat4.rotate(m, m, this.currRotation, [0, 1, 0]);

	return m;
}

BezierAnimation.prototype.calculateDistance_2points = function(p1, p2) {
    var a = Math.pow((p2[0] - p1[0]), 2);
    var b = Math.pow(p2[1] - p1[1], 2);
    var c = Math.pow(p2[2] - p1[2], 2);

    var result = Math.sqrt(a+b+c);

    return result;
}

BezierAnimation.prototype.calculateDistance = function() {

    var chord = this.calculateDistance_2points(this.pt1, this.pt4);
    var cont_net = this.calculateDistance_2points(this.pt1, this.pt2) +
    this.calculateDistance_2points(this.pt2, this.pt3) +
    this.calculateDistance_2points(this.pt3, this.pt4);

    this.distance = (cont_net + chord) / 2;

}

BezierAnimation.prototype.updateAnimation = function(deltaTime){

    this.t += ((deltaTime/1000) * this.speed) / this.distance;
    if (this.t >= 1){
        this.inUse = false;
        this.x = this.pt4[0];
        this.y = this.pt4[1];
        this.z = this.pt4[2];
        return;
    }

    var b1 = Math.pow(1-this.t , 3);
    var b2 = 3*this.t*Math.pow((1-this.t),2);
    var b3 = 3*Math.pow(this.t,2)*(1-this.t);
    var b4 = Math.pow(this.t,3);

    var next_x = this.pt1[0]*b1 + this.pt2[0]*b2 + this.pt3[0]*b3 + this.pt4[0]*b4;
    var next_y = this.pt1[1]*b1 + this.pt2[1]*b2 + this.pt3[1]*b3 + this.pt4[1]*b4;
    var next_z = this.pt1[2]*b1 + this.pt2[2]*b2 + this.pt3[2]*b3 + this.pt4[2]*b4;

    this.currRotation = Math.atan2(next_x - this.x, next_z - this.z);

    this.x = next_x;
    this.y = next_y;
    this.z = next_z;

}

BezierAnimation.prototype.restartAnimation = function(){
    this.currRotation = 0
    this.x = this.pt1[0];
    this.y = this.pt1[1];
    this.z = this.pt1[2];
    this.t = 0;
    this.inUse = false;
}
