"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var PlanetTopographyGenerator;
    (function (PlanetTopographyGenerator) {
        class Vertex {
            constructor(pos, depth, altitude) {
                this.pos = pos;
                this.depth = (depth == null ? 0 : depth);
                this.altitude = (altitude == null ? 0.5 : altitude);
            }
            static fromPos(pos) {
                return new Vertex(pos, null, null);
            }
            // static methods
            static interpolate(vertex0, vertex1) {
                var pos = vertex0.pos.clone().add(vertex1.pos).half();
                var depth = vertex0.depth + 1;
                var altitudeInterpolated = (vertex0.altitude
                    + vertex1.altitude) / 2;
                var altitudeOffsetMax = 1 / Math.pow(2, depth);
                var random = 2 * Math.random() - 1;
                var altitudeOffset = random * altitudeOffsetMax;
                var altitude = altitudeInterpolated + altitudeOffset;
                var returnValue = new Vertex(pos, depth, altitude);
                return returnValue;
            }
            // instance methods
            clone() {
                return new Vertex(this.pos.clone(), this.depth, this.altitude);
            }
        }
        PlanetTopographyGenerator.Vertex = Vertex;
    })(PlanetTopographyGenerator = ThisCouldBeBetter.PlanetTopographyGenerator || (ThisCouldBeBetter.PlanetTopographyGenerator = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
