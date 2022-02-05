"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var PlanetTopographyGenerator;
    (function (PlanetTopographyGenerator) {
        class Scene {
            constructor(mesh, camera) {
                this.mesh = mesh;
                this.camera = camera;
            }
            draw() {
                if (this.display == null) {
                    var displaySize = this.camera.viewSize;
                    this.display = new PlanetTopographyGenerator.Display(displaySize);
                    this.display.initialize();
                }
                this.camera.constraintsApply();
                this.display.clear();
                this.display.drawMeshForCamera(this.mesh, this.camera);
            }
        }
        PlanetTopographyGenerator.Scene = Scene;
    })(PlanetTopographyGenerator = ThisCouldBeBetter.PlanetTopographyGenerator || (ThisCouldBeBetter.PlanetTopographyGenerator = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
