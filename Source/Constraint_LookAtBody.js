"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var PlanetTopographyGenerator;
    (function (PlanetTopographyGenerator) {
        class Constraint_LookAtBody {
            constructor(targetBody) {
                this.name = "LookAtBody";
                this.targetBody = targetBody;
            }
            applyToBody(body) {
                var bodyOrientationForward = this.targetBody.loc.pos.clone().subtract(body.loc.pos).normalize();
                body.loc.orientation = new PlanetTopographyGenerator.Orientation(bodyOrientationForward, body.loc.orientation.down);
            }
        }
        PlanetTopographyGenerator.Constraint_LookAtBody = Constraint_LookAtBody;
    })(PlanetTopographyGenerator = ThisCouldBeBetter.PlanetTopographyGenerator || (ThisCouldBeBetter.PlanetTopographyGenerator = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
