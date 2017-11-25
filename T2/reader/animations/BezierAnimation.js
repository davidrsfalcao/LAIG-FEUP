/**
 * BezierAnimation
 * @constructor
 * @param {Object} scene - this scene
 * @param {String} id - animation id
 * @param {Array} controlPoints - coordinates of four control Points
 * @param {Number} speed - animation speed
 */
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


    this.distance = this.calculateCurveLength();
    console.log("Distancia Alg: " + this.distance);


}

BezierAnimation.prototype = Object.create(Animation.prototype);
BezierAnimation.prototype.constructor = BezierAnimation;

/**
 * Get transformation matrix after animation is applied
 * @param {Number} deltaT - time
 */
BezierAnimation.prototype.getMatrix = function(deltaT) {
	var m = mat4.create();
    mat4.identity(m);

    this.updateAnimation(deltaT);
    mat4.translate(m, m, [this.x, this.y, this.z]);
    mat4.rotate(m, m, this.currRotation, [0, 1, 0]);

	return m;
}

/**
 * Calculate midpoint of Point p1 and Point p2
 * @param {Array} p1 - Coordinates of Point 1
 * @param {Array} p2 - Coordinates of Point 2
 */
BezierAnimation.prototype.calculateMidpoint = function(p1, p2) {

    var midpoint = [];

    midpoint[0] = (p1[0] + p2[0]) / 2;
    midpoint[1] = (p1[1] + p2[1]) / 2;
    midpoint[2] = (p1[2] + p2[2]) / 2;

    return midpoint;

}


/**
 * Calculate distance between Point p1 and Point p2
 * @param {Array} p1 - Coordinates of Point 1
 * @param {Array} p2 - Coordinates of Point 2
 */
BezierAnimation.prototype.calculateDistance_2points = function(p1, p2) {
    var a = Math.pow((p2[0] - p1[0]), 2);
    var b = Math.pow(p2[1] - p1[1], 2);
    var c = Math.pow(p2[2] - p1[2], 2);

    var result = Math.sqrt(a+b+c);

    return result;
}

/**
 * Calculate bezier curve length through the Casteljau's algorithm
 */
BezierAnimation.prototype.calculateCurveLength = function() {
    var result = 0, result1 = 0;
    var error = 100;
    var points = [this.pt1, this.pt2, this.pt3, this.pt4];
    var midpoint;

    while(error > 1E-4){
        var next_points = [];
        next_points.push(this.pt1);

        for(var i = 0; i < (points.length -1); i++){
            midpoint = this.calculateMidpoint(points[i], points[i+1]);
            next_points.push(midpoint);
        }
        next_points.push(this.pt4);
        points = next_points;
        result = 0;
        for(var i = 0; i < (points.length -1); i++){
            result += this.calculateDistance_2points(points[i], points[i+1]);
        }
        error = Math.abs(result1 - result);
        result1 = result;


    }
    return result;
}


/**
 * Update Animation 
 * @param {Number} deltaTime - time
 */
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

/**
 * Restart Animation 
 */
BezierAnimation.prototype.restartAnimation = function(){
    this.currRotation = 0
    this.x = this.pt1[0];
    this.y = this.pt1[1];
    this.z = this.pt1[2];
    this.t = 0;
    this.inUse = false;
}
