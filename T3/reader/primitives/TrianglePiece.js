/**
 * Triangle - Constructs Triangle
 * @constructor
 * @param {Object} scene - this scene
 * @param {Number} x - coordinate x of first point
 * @param {Number} y - coordinate y of first point

 */
function TrianglePiece(scene, x, y, direction, player) {
    CGFobject.call(this, scene);
    this.scene=scene;
    this.x=x;
    this.y=y;
    this.direction=direction;
    this.player=player;
    this.ang;

    this.triangle = new Triangle(this.scene, -10, 0, 0, 10, 0, 0, 0, 10, 0);
    this.rectangle = new Rectangle(this.scene, 0, 0, Math.sqrt(200)+Math.sqrt(32), 3);
    this.triangle1 = new  Triangle(this.scene, 0, 0, 0, -10, 0, 0, -14, -4, 0);
    this.triangle2 = new  Triangle(this.scene, -14, -4, 0, -10, 0, 0, 0, 0, 0);
    this.rectangle2 = new Rectangle(this.scene, 0, 3, Math.sqrt(212), 0);


    switch(direction){
        case "n": this.ang=Math.PI;
        break;
        case"s": this.ang=0;
        break;
        case "e": this.ang=Math.PI/2;
        break;
        case "w" : this.ang= -Math.PI/2;
        break;
        case "ne" : this.ang = 3*Math.PI/4;
        break;
        case "se" : this.ang = Math.PI/4;
        break;
        case "nw" : this.ang = -Math.PI/4 *3;
        break;
        case "sw": this.ang = -Math.PI/4;
        break;
    }

    let piece = {type: "piece", object: this, line: x, column: y, player: player, direction: direction};
    this.scene.pieces.push(piece);

};

var degToRad = Math.PI/180;
TrianglePiece.prototype = Object.create(CGFobject.prototype);
TrianglePiece.prototype.constructor=TrianglePiece;

TrianglePiece.prototype.display = function(){
    this.scene.tex.apply();


    this.scene.pushMatrix();
        let dX = (this.x-5)*10;
        let dY = (this.y-5)*10;

        this.scene.translate(dY,0,dX);
        this.scene.pushMatrix();
            this.scene.rotate(this.ang, 0, 1, 0);
            this.scene.pushMatrix();

                this.scene.rotate(Math.PI/2, 1, 0, 0);
                this.scene.scale(0.3, 0.3, 0.3);
                this.triangle.display();

                this.scene.pushMatrix();
                    this.scene.rotate(Math.PI, 0, 1,0);
                    this.scene.translate(0, 0 , 3);
                    this.triangle.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                    this.scene.translate(0, 10,0);
                    this.scene.rotate(225*degToRad, 0, 0, 1);
                    this.scene.rotate(-Math.PI/2, 1, 0, 0);
                    this.rectangle.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                    this.scene.translate(0,0,-3);
                    this.scene.rotate(180*degToRad, 0, 1, 0);
                    this.scene.translate(0, 10,0);
                    this.scene.rotate(225*degToRad, 0, 0, 1);
                    this.scene.rotate(-Math.PI/2, 1, 0, 0);
                    this.rectangle.display();
                this.scene.popMatrix();

                this.triangle1.display();
                this.scene.pushMatrix();
                    this.scene.translate(0, 0, -3);
                    this.scene.rotate(Math.PI, 0, 1, 0);
                    this.triangle1.display();
                this.scene.popMatrix();


                this.scene.pushMatrix();
                    this.scene.translate(0, 0, -3);
                    this.triangle2.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                    this.scene.rotate(Math.PI, 0, 1, 0);
                    this.triangle2.display();
                this.scene.popMatrix();

                let angle= Math.PI/2 - Math.atan2(14,4);
                this.scene.pushMatrix();
                    this.scene.translate(-14, -4, -3);
                    this.scene.rotate(angle, 0, 0, 1);
                    this.scene.rotate(Math.PI/2, 1, 0, 0);
                    this.rectangle2.display();
                this.scene.popMatrix();


                this.scene.pushMatrix();
                    this.scene.rotate(Math.PI, 0,1,0);
                    this.scene.translate(-14, -4, 0);
                    this.scene.rotate(angle, 0, 0, 1);
                    this.scene.rotate(Math.PI/2, 1, 0, 0);
                    this.rectangle2.display();
                this.scene.popMatrix();

            this.scene.popMatrix();
        this.scene.popMatrix();
   this.scene.popMatrix();

}
