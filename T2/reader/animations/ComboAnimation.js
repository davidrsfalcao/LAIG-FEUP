function ComboAnimation(scene, id, animations) {
    Animation.call(this, scene, id);

    this.animations = animations;
    this.counter = -1;

}

ComboAnimation.prototype = Object.create(Animation.prototype);
ComboAnimation.prototype.constructor = ComboAnimation;

ComboAnimation.prototype.getMatrix = function(deltaT) {
	var m = mat4.create();
    mat4.identity(m);

    this.updateAnimation(deltaT);
    m = this.animations[this.counter].getMatrix(deltaT);


	return m;
}


ComboAnimation.prototype.updateAnimation = function(deltaTime){

    console.log(deltaTime);
    if (this.animations.length == 0)
        return;

    if (this.counter == -1){
        console.log("HERE");
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

ComboAnimation.prototype.restartAnimation = function(){
    this.inUse = false;
    this.counter = -1;
    for(var i = 0; i < this.animations.length; i++){
        this.animations[i].restartAnimation();
    }
}
