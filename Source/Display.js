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
                var faces = mesh.faces;
                var verticesInFace = new Array();
                for (var f = 0; f < faces.length; f++) {
                    var face = faces[f];
                    this.drawMeshForCamera_Face(mesh, camera, face, verticesInFace);
                }
            }
            drawMeshForCamera_Face(mesh, camera, face, verticesInFace) {
                verticesInFace.length = 0;
                this.drawMeshForCamera_Face_VerticesInFace(mesh, camera, face, verticesInFace);
                if (verticesInFace.length > 0) {
                    this.drawMeshForCamera_Face_Draw(camera, face, verticesInFace);
                }
            }
            drawMeshForCamera_Face_VerticesInFace(mesh, camera, face, verticesInFace) {
                var cameraPos = camera.loc.pos;
                var plane = this._plane;
                var displacementFromCameraToFaceVertex0 = this._displacement;
                for (var vi = 0; vi < face.length; vi++) {
                    var vertexIndex = face[vi];
                    var vertex = mesh.vertices[vertexIndex];
                    verticesInFace.push(vertex);
                }
                var positionsOfVerticesInFace = PlanetTopographyGenerator.Vertex.positionsForMany(verticesInFace);
                var faceNormal = plane.fromPoints(positionsOfVerticesInFace).normal;
                displacementFromCameraToFaceVertex0.overwriteWith(verticesInFace[0].pos).subtract(cameraPos);
                var faceNormalDotDisplacement = faceNormal.dotProduct(displacementFromCameraToFaceVertex0);
                var doesFacePointTowardCamera = (faceNormalDotDisplacement < 0);
                if (doesFacePointTowardCamera == false) {
                    verticesInFace = null;
                }
                return verticesInFace;
            }
            drawMeshForCamera_Face_Draw(camera, face, verticesInFace) {
                var drawPos = this._drawPos;
                var faceAltitude = 0;
                this.graphics.beginPath();
                for (var vi = 0; vi < face.length; vi++) {
                    var vertex = verticesInFace[vi];
                    faceAltitude += vertex.altitude;
                    camera.convertWorldCoordsToViewCoords(drawPos.overwriteWith(vertex.pos));
                    if (vi == 0) {
                        this.graphics.moveTo(drawPos.x, drawPos.y);
                    }
                    else {
                        this.graphics.lineTo(drawPos.x, drawPos.y);
                    }
                }
                this.graphics.closePath();
                faceAltitude /= face.length;
                var altitudeAtLowTide = .65;
                var altitudeAtHighTide = .67;
                var altitudeAtTreeLine = .95;
                var colorForFace;
                if (faceAltitude < altitudeAtLowTide) {
                    colorForFace = "rgb(0, 0, 128)";
                }
                else if (faceAltitude < altitudeAtHighTide) {
                    var colorComponent = Math.floor(255 * faceAltitude);
                    colorForFace =
                        "rgb("
                            + colorComponent + ","
                            + colorComponent + ","
                            + Math.floor(colorComponent / 4)
                            + ")";
                }
                else if (faceAltitude < altitudeAtTreeLine) {
                    var colorComponent = Math.floor(255 * faceAltitude);
                    colorForFace =
                        "rgb(0, " + colorComponent + ", 0)";
                }
                else {
                    var colorComponent = Math.floor(255 * faceAltitude);
                    colorForFace =
                        "rgb("
                            + colorComponent + ","
                            + colorComponent + ","
                            + colorComponent + ")";
                }
                var isWireframe = false;
                if (isWireframe == false) {
                    this.graphics.fillStyle = colorForFace;
                    this.graphics.strokeStyle = colorForFace;
                    this.graphics.fill();
                }
                this.graphics.stroke();
            }
            initialize() {
                this.canvas = document.createElement("canvas");
                this.canvas.width = this.size.x;
                this.canvas.height = this.size.y;
                this.graphics = this.canvas.getContext("2d");
                var divMain = document.getElementById("divMain");
                divMain.appendChild(this.canvas);
            }
        }
        PlanetTopographyGenerator.Display = Display;
    })(PlanetTopographyGenerator = ThisCouldBeBetter.PlanetTopographyGenerator || (ThisCouldBeBetter.PlanetTopographyGenerator = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
