"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var PlanetTopographyGenerator;
    (function (PlanetTopographyGenerator) {
        class Display {
            constructor(size) {
                this.size = size;
                this.colorBack = "Black";
                this.colorFore = "Gray";
                this._displacement = new PlanetTopographyGenerator.Coords(0, 0, 0);
                this._drawPos = new PlanetTopographyGenerator.Coords(0, 0, 0);
                this._plane = new PlanetTopographyGenerator.Plane(new PlanetTopographyGenerator.Coords(0, 0, 0), 0);
            }
            clear() {
                this.graphics.clearRect(0, 0, this.size.x, this.size.y);
            }
            drawMeshForCamera(mesh, camera) {
                this.drawPos = new PlanetTopographyGenerator.Coords(0, 0, 0);
                var faces = mesh.faces;
                for (var f = 0; f < faces.length; f++) {
                    var face = faces[f];
                    this.drawMeshForCamera_Face(mesh, camera, face);
                }
            }
            drawMeshForCamera_Face(mesh, camera, face) {
                var cameraPos = camera.loc.pos;
                var displacementFromCameraToFaceVertex0 = new PlanetTopographyGenerator.Coords(0, 0, 0);
                var verticesInFace = face.vertices(mesh);
                var positionsOfVerticesInFace = verticesInFace.map(x => x.pos);
                var faceNormal = PlanetTopographyGenerator.Plane.fromPoints(positionsOfVerticesInFace).normal;
                displacementFromCameraToFaceVertex0.overwriteWith(verticesInFace[0].pos).subtract(cameraPos);
                var faceNormalDotDisplacement = faceNormal.dotProduct(displacementFromCameraToFaceVertex0);
                var doesFacePointTowardCamera = (faceNormalDotDisplacement < 0);
                if (doesFacePointTowardCamera) {
                    this.drawMeshForCamera_Face_FacingCamera(mesh, camera, face, verticesInFace);
                }
            }
            drawMeshForCamera_Face_FacingCamera(mesh, camera, face, verticesInFace) {
                this.graphics.beginPath();
                var faceVertexCount = verticesInFace.length;
                var faceAltitude = 0;
                for (var vi = 0; vi < faceVertexCount; vi++) {
                    var vertex = verticesInFace[vi];
                    faceAltitude += vertex.value;
                    camera.convertWorldCoordsToViewCoords(this.drawPos.overwriteWith(vertex.pos));
                    if (vi == 0) {
                        this.graphics.moveTo(this.drawPos.x, this.drawPos.y);
                    }
                    else {
                        this.graphics.lineTo(this.drawPos.x, this.drawPos.y);
                    }
                }
                this.graphics.closePath();
                faceAltitude /= faceVertexCount;
                var terrainGroup = PlanetTopographyGenerator.TerrainGroup.Instances().Earthlike; // hack
                var colorForFace = terrainGroup.colorAtAltitude(faceAltitude);
                this.graphics.fillStyle = colorForFace;
                this.graphics.strokeStyle = colorForFace;
                this.graphics.fill();
                this.graphics.stroke();
            }
            initialize() {
                this.canvas = document.createElement("canvas");
                this.canvas.width = this.size.x;
                this.canvas.height = this.size.y;
                this.graphics = this.canvas.getContext("2d");
                var divOutput = document.getElementById("divOutput");
                divOutput.appendChild(this.canvas);
            }
        }
        PlanetTopographyGenerator.Display = Display;
    })(PlanetTopographyGenerator = ThisCouldBeBetter.PlanetTopographyGenerator || (ThisCouldBeBetter.PlanetTopographyGenerator = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
