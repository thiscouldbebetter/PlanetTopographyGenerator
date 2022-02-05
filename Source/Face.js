"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var PlanetTopographyGenerator;
    (function (PlanetTopographyGenerator) {
        class Face {
            constructor(vertexIndices) {
                this._vertexIndices = vertexIndices;
            }
            clone() {
                return new Face(this._vertexIndices.slice(0));
            }
            vertexIndex(vi) {
                return this._vertexIndices[vi];
            }
            vertexIndexAdd(vertexIndex) {
                this._vertexIndices.push(vertexIndex);
            }
            vertexIndices() {
                // todo - Remove this.
                return this._vertexIndices;
            }
            vertexCount() {
                return this._vertexIndices.length;
            }
            vertices(mesh) {
                var returnVertices = [];
                var vertexCount = this.vertexCount();
                for (var vi = 0; vi < vertexCount; vi++) {
                    var vertexIndex = this.vertexIndex(vi);
                    var vertex = mesh.vertices[vertexIndex];
                    returnVertices.push(vertex);
                }
                return returnVertices;
            }
        }
        PlanetTopographyGenerator.Face = Face;
    })(PlanetTopographyGenerator = ThisCouldBeBetter.PlanetTopographyGenerator || (ThisCouldBeBetter.PlanetTopographyGenerator = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
