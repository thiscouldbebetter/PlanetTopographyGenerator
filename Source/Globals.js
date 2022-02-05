"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var PlanetTopographyGenerator;
    (function (PlanetTopographyGenerator) {
        class Globals {
            initialize(scenes) {
                this.scenes = scenes;
                for (var i = 0; i < this.scenes.length; i++) {
                    var scene = this.scenes[i];
                    scene.draw();
                }
                this.inputHelper = new PlanetTopographyGenerator.InputHelper();
                this.inputHelper.initialize();
            }
        }
        Globals.Instance = new Globals();
        PlanetTopographyGenerator.Globals = Globals;
    })(PlanetTopographyGenerator = ThisCouldBeBetter.PlanetTopographyGenerator || (ThisCouldBeBetter.PlanetTopographyGenerator = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
