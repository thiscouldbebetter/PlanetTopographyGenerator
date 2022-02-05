"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var PlanetTopographyGenerator;
    (function (PlanetTopographyGenerator) {
        class Shape {
            constructor(name, toMesh, meshProcessAfterSubdivide) {
                this.name = name;
                this.toMesh = toMesh;
                this.meshProcessAfterSubdivide = meshProcessAfterSubdivide;
            }
            static Instances() {
                if (Shape._instances == null) {
                    Shape._instances = new Shape_Instances();
                }
                return Shape._instances;
            }
            static byName(name) {
                return Shape.Instances().byName(name);
            }
        }
        PlanetTopographyGenerator.Shape = Shape;
        class Shape_Instances {
            constructor() {
                this.Octahedron = new Shape("Octahedron", () => PlanetTopographyGenerator.MeshHelper.buildOctahedron("Octahedron"), (m) => PlanetTopographyGenerator.MeshHelper.meshSpherify(m, 1));
                this.Square = new Shape("Square", () => PlanetTopographyGenerator.MeshHelper.buildSquare("Square"), (m) => m);
                this._All =
                    [
                        this.Octahedron,
                        this.Square
                    ];
                this._AllByName = new Map(this._All.map(x => [x.name, x]));
            }
            byName(shapeName) {
                return this._AllByName.get(shapeName);
            }
        }
        PlanetTopographyGenerator.Shape_Instances = Shape_Instances;
    })(PlanetTopographyGenerator = ThisCouldBeBetter.PlanetTopographyGenerator || (ThisCouldBeBetter.PlanetTopographyGenerator = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
