"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var PlanetTopographyGenerator;
    (function (PlanetTopographyGenerator) {
        class InputHelper {
            handleEventKeyDown(event) {
                var key = event.key;
                var scenes = PlanetTopographyGenerator.Globals.Instance.scenes;
                for (var i = 0; i < scenes.length; i++) {
                    var scene = scenes[i];
                    this.handleEventKeyDown_Scene(key, scene);
                }
            }
            handleEventKeyDown_Scene(key, scene) {
                var camera = scene.camera;
                var cameraLoc = camera.loc;
                var cameraPos = cameraLoc.pos;
                var cameraOrientation = cameraLoc.orientation;
                var constraintLook = camera.constraints.find(x => x.name == "LookAtBody");
                var amountToRotate = .1;
                if (key == "a") {
                    cameraPos.subtract(cameraOrientation.right.multiplyScalar(amountToRotate));
                }
                else if (key == "c") {
                    constraintLook.targetBody.loc.pos.add(cameraOrientation.right);
                }
                else if (key == "d") {
                    cameraPos.add(cameraOrientation.right.multiplyScalar(amountToRotate));
                }
                else if (key == "s") {
                    cameraPos.add(cameraOrientation.down.multiplyScalar(amountToRotate));
                }
                else if (key == "w") {
                    cameraPos.subtract(cameraOrientation.down.multiplyScalar(amountToRotate));
                }
                else if (key == "z") {
                    constraintLook.targetBody.loc.pos.subtract(cameraOrientation.right);
                }
                scene.draw();
            }
            initialize() {
                document.body.onkeydown = this.handleEventKeyDown.bind(this);
            }
        }
        PlanetTopographyGenerator.InputHelper = InputHelper;
    })(PlanetTopographyGenerator = ThisCouldBeBetter.PlanetTopographyGenerator || (ThisCouldBeBetter.PlanetTopographyGenerator = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
