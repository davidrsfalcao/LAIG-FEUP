/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Quad(scene,minS,maxS,minT,maxT) {
    CGFobject.call(this,scene);

    this.minS = minS;
    this.minT = minT;
    this.maxS = maxS;
    this.maxT = maxT;

    this.initBuffers();
};

Quad.prototype = Object.create(CGFobject.prototype);
Quad.prototype.constructor=Quad;

Quad.prototype.initBuffers = function () {
    this.vertices = [
            -0.5, -0.5, 0,
            0.5, -0.5, 0,
            -0.5, 0.5, 0,
            0.5, 0.5, 0
            ];

    this.indices = [
            0, 1, 2,
            3, 2, 1
        ];

    this.normals = [
             0,0,1,
             0,0,1,
             0,0,1,
             0,0,1
        ];

    this.texCoords = [
            this.minS,this.maxT,
            this.maxS,this.maxT,
            this.minS,this.minT,
            this.maxS,this.minT
    ]
    this.primitiveType=this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

Quad.prototype.amplifyTexture = function(amplifierS, amplifierT) {
    for (let i = 0; i < this.originalTexCoords.length; i += 2) {
        this.texCoords[i] = this.originalTexCoords[i] / amplifierS;
        this.texCoords[i + 1] = this.originalTexCoords[i + 1] / amplifierT;
    }

    this.updateTexCoordsGLBuffers();
};
