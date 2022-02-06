"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var PlanetTopographyGenerator;
    (function (PlanetTopographyGenerator) {
        class Camera {
            constructor(name, focalLength, viewSize, loc) {
                this.name = name;
                this.focalLength = focalLength;
                this.viewSize = viewSize;
                this.loc = loc;
                this.viewSizeHalf = this.viewSize.clone().half();
                this.constraints = [];
            }
            convertWorldCoordsToViewCoords(coordsToConvert) {
                var orientation = this.loc.orientation;
                coordsToConvert.subtract(this.loc.pos);
                var distanceAlongCameraForward = coordsToConvert.dotProduct(orientation.forward);
                coordsToConvert.overwriteWithXYZ(coordsToConvert.dotProduct(orientation.right), coordsToConvert.dotProduct(orientation.down), distanceAlongCameraForward);
                if (this.focalLength != null) {
                    coordsToConvert.multiplyScalar(this.focalLength).divideScalar(distanceAlongCameraForward);
                }
                coordsToConvert.add(this.viewSizeHalf);
                return coordsToConvert;
            }
            // scene
            constraintsApply() {
                for (var i = 0; i < this.constraints.length; i++) {
                    var constraint = this.constraints[i];
                    constraint.applyToBody(this);
                }
            }
        }
        PlanetTopographyGenerator.Camera = Camera;
    })(PlanetTopographyGenerator = ThisCouldBeBetter.PlanetTopographyGenerator || (ThisCouldBeBetter.PlanetTopographyGenerator = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
