"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var PlanetTopographyGenerator;
    (function (PlanetTopographyGenerator) {
        class Vertex {
            constructor(pos, value) {
                this.pos = pos;
                this.value = (value == null ? 0.5 : value);
            }
            static fromPos(pos) {
                return new Vertex(pos, null);
            }
            // static methods
            static interpolate(vertex0, vertex1) {
                var pos = vertex0.pos.clone().add(vertex1.pos).half();
                var valueInterpolated = (vertex0.value
                    + vertex1.value) / 2;
                var returnValue = new Vertex(pos, valueInterpolated);
                return returnValue;
            }
            // instance methods
            clone() {
                return new Vertex(this.pos.clone(), this.value);
            }
        }
        PlanetTopographyGenerator.Vertex = Vertex;
    })(PlanetTopographyGenerator = ThisCouldBeBetter.PlanetTopographyGenerator || (ThisCouldBeBetter.PlanetTopographyGenerator = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
