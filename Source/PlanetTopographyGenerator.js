"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var PlanetTopographyGenerator;
    (function (PlanetTopographyGenerator_1) {
        class PlanetTopographyGenerator {
            constructor(shapeInitial, timesToSubdivide, terrainGroup) {
                this.shapeInitial = shapeInitial;
                this.timesToSubdivide = timesToSubdivide;
                this.terrainGroup = terrainGroup;
                this.millsecondsToGenerate = null;
            }
            meshesGenerate() {
                var timeStart = new Date();
                var meshInitial = this.shapeInitial.toMesh();
                var meshesGenerated = [meshInitial];
                var mesh = meshInitial;
                for (var i = 0; i < this.timesToSubdivide; i++) {
                    mesh = mesh.clone();
                    var altitudeOffsetMax = 1 / Math.pow(2, i + 1);
                    mesh.subdivide(altitudeOffsetMax);
                    mesh = this.shapeInitial.meshProcessAfterSubdivide(mesh);
                    meshesGenerated.push(mesh);
                }
                var timeEnd = new Date();
                var millisecondsToGenerate = timeEnd.getTime() - timeStart.getTime();
                this.millsecondsToGenerate = millisecondsToGenerate;
                return meshesGenerated;
            }
            meshesToScenes(meshes) {
                var scenes = [];
                for (var i = 0; i < meshes.length; i++) {
                    var mesh = meshes[i];
                    var camera = new PlanetTopographyGenerator_1.Camera("Camera0", 200, // focalLength
                    new PlanetTopographyGenerator_1.Coords(200, 200, 200), // viewSize
                    new PlanetTopographyGenerator_1.Disposition(new PlanetTopographyGenerator_1.Coords(1, 1, -1), // pos
                    new PlanetTopographyGenerator_1.Orientation(new PlanetTopographyGenerator_1.Coords(-1, -1, 1), // forward
                    new PlanetTopographyGenerator_1.Coords(0, 0, 1) // down
                    )));
                    camera.constraints.push(new PlanetTopographyGenerator_1.Constraint_MaintainDistance(new PlanetTopographyGenerator_1.Coords(0, 0, 0), // center
                    (camera.focalLength / 80) // distanceToMaintain
                    ));
                    camera.constraints.push(new PlanetTopographyGenerator_1.Constraint_LookAtBody(new PlanetTopographyGenerator_1.Empty(new PlanetTopographyGenerator_1.Disposition(new PlanetTopographyGenerator_1.Coords(0, 0, 0), new PlanetTopographyGenerator_1.Orientation(new PlanetTopographyGenerator_1.Coords(1, 0, 0), new PlanetTopographyGenerator_1.Coords(0, 0, 1))))));
                    var scene = new PlanetTopographyGenerator_1.Scene(mesh, camera);
                    scenes.push(scene);
                }
                return scenes;
            }
        }
        PlanetTopographyGenerator_1.PlanetTopographyGenerator = PlanetTopographyGenerator;
    })(PlanetTopographyGenerator = ThisCouldBeBetter.PlanetTopographyGenerator || (ThisCouldBeBetter.PlanetTopographyGenerator = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
