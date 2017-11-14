function Animation(scene, id) {
    this.scene = scene;
    this.id = id;
    this.inUse = false;
}

Animation.prototype.constructor = Animation;
Animation.prototype.getState = function(){
    return this.inUse;
}
