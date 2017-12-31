 /**
 * MyInterface class, creating a GUI interface.
 * @constructor
 */
function MyInterface() {
    //call CGFinterface constructor
    CGFinterface.call(this);
}
;

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui

    this.gui = new dat.GUI();
    var group = this.gui.addFolder("Game");
    group.open();

    group.add(this.scene, 'newgame').name('New Game');
    group.add(this.scene, 'mode', { "Player vs Player": 1, "Player vs CPU": 2, "CPU vs CPU": 3}).name('Mode');
    group.add(this.scene, 'difficulty', {"Easy": 1, "Hard": 2}).name('Difficulty');

    group.add(this.scene, 'selected_scene', { Winter: 1, Porto: 2}).name('Scene');
    group.add(this.scene, 'undo').name('Undo');
    return true;
};

/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 */
MyInterface.prototype.addLightsGroup = function(lights) {

    var group = this.gui.addFolder("Lights");


    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            this.scene.lightValues[key] = lights[key][0];
            group.add(this.scene.lightValues, key);
        }
    }
}
