function Animation(scene, id) {
    this.scene = scene;
    this.id = id;
    this.inUse = false;
}

Animation.prototype.constructor = Animation;

Animation.prototype.setState = function(state) {
    this.inUse = state;
}
