"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var PlanetTopographyGenerator;
    (function (PlanetTopographyGenerator) {
        class Constraint_MaintainDistance {
            constructor(center, distanceToMaintain) {
                this.name = "MaintainDistance";
                this.center = center;
                this.distanceToMaintain = distanceToMaintain;
            }
            applyToBody(body) {
                var bodyPos = body.loc.pos;
                var directionFromCenterToBody = bodyPos.clone().subtract(this.center).normalize();
                bodyPos.overwriteWith(this.center).add(directionFromCenterToBody.multiplyScalar(this.distanceToMaintain));
            }
        }
        PlanetTopographyGenerator.Constraint_MaintainDistance = Constraint_MaintainDistance;
    })(PlanetTopographyGenerator = ThisCouldBeBetter.PlanetTopographyGenerator || (ThisCouldBeBetter.PlanetTopographyGenerator = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
