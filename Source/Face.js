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
            vertexCount() {
                return this._vertexIndices.length;
            }
        }
        PlanetTopographyGenerator.Face = Face;
    })(PlanetTopographyGenerator = ThisCouldBeBetter.PlanetTopographyGenerator || (ThisCouldBeBetter.PlanetTopographyGenerator = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
