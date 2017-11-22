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
    var group = this.gui.addFolder("Animations");
    group.open();

    group.add(this.scene, 'restart');
    group.add(this.scene, 'pause');
    group.add(this.scene, 'frames_sec', 1, 200);
    group.add(this.scene, 'cameraChosen', {Free: 0, Tv: 1});

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

/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 */
MyInterface.prototype.addSelectableGroup = function(selectables) {

    var group = this.gui.addFolder("Shadders");
    group.add(this.scene, 'shadderChosen', {Normal: 0, Vertex: 1, Fragment: 2, 'Vertex & Fragment':3});

    for (var key in selectables) {
        if (selectables.hasOwnProperty(key)) {
            this.scene.selectableValues[key] = selectables[key][0];
            group.add(this.scene.selectableValues, key);
        }
    }
}
