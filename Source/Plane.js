"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var PlanetTopographyGenerator;
    (function (PlanetTopographyGenerator) {
        class Plane {
            constructor(normal, distanceFromOrigin) {
                this.normal = normal;
                this.distanceFromOrigin = distanceFromOrigin;
            }
            static fromPoints(points) {
                return new Plane(new PlanetTopographyGenerator.Coords(0, 0, 0), 0).fromPoints(points);
            }
            fromPoints(points) {
                var point0 = points[0];
                var displacementFromPoint0To1 = points[1].clone().subtract(point0);
                var displacementFromPoint0To2 = points[2].clone().subtract(point0);
                this.normal.overwriteWith(displacementFromPoint0To1).crossProduct(displacementFromPoint0To2).normalize();
                this.distanceFromOrigin = this.normal.dotProduct(point0);
                return this;
            }
        }
        PlanetTopographyGenerator.Plane = Plane;
    })(PlanetTopographyGenerator = ThisCouldBeBetter.PlanetTopographyGenerator || (ThisCouldBeBetter.PlanetTopographyGenerator = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
