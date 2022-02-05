"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var PlanetTopographyGenerator;
    (function (PlanetTopographyGenerator) {
        class MeshHelper {
            static buildOctahedron(name) {
                var returnValue = new PlanetTopographyGenerator.Mesh(name, 
                // vertices
                [
                    PlanetTopographyGenerator.Vertex.fromPos(new PlanetTopographyGenerator.Coords(0, 0, -1)),
                    PlanetTopographyGenerator.Vertex.fromPos(new PlanetTopographyGenerator.Coords(1, 0, 0)),
                    PlanetTopographyGenerator.Vertex.fromPos(new PlanetTopographyGenerator.Coords(0, 1, 0)),
                    PlanetTopographyGenerator.Vertex.fromPos(new PlanetTopographyGenerator.Coords(-1, 0, 0)),
                    PlanetTopographyGenerator.Vertex.fromPos(new PlanetTopographyGenerator.Coords(0, -1, 0)),
                    PlanetTopographyGenerator.Vertex.fromPos(new PlanetTopographyGenerator.Coords(0, 0, 1)), // 5 - bottom
                ], 
                // faces
                [
                    [0, 2, 1],
                    [0, 3, 2],
                    [0, 4, 3],
                    [0, 1, 4],
                    [5, 1, 2],
                    [5, 2, 3],
                    [5, 3, 4],
                    [5, 4, 1], // bottom northeast
                ]);
                return returnValue;
            }
            static meshSpherify(meshToSpherify, radius) {
                var centerOfSphere = new PlanetTopographyGenerator.Coords(0, 0, 0);
                var vertices = meshToSpherify.vertices;
                var numberOfVertices = vertices.length;
                if (radius == null) {
                    var sumOfDistances = 0;
                    var displacementOfVertexFromCenter = new PlanetTopographyGenerator.Coords(0, 0, 0);
                    for (var i = 0; i < numberOfVertices; i++) {
                        var vertex = vertices[i];
                        var vertexPos = vertex.pos;
                        displacementOfVertexFromCenter.overwriteWith(vertexPos).subtract(centerOfSphere);
                        var distanceOfVertexFromCenter = displacementOfVertexFromCenter.magnitude();
                        sumOfDistances += distanceOfVertexFromCenter;
                    }
                    radius = sumOfDistances / numberOfVertices;
                }
                for (var i = 0; i < numberOfVertices; i++) {
                    var vertex = vertices[i];
                    vertex.pos.normalize().multiplyScalar(radius);
                }
            }
        }
        PlanetTopographyGenerator.MeshHelper = MeshHelper;
    })(PlanetTopographyGenerator = ThisCouldBeBetter.PlanetTopographyGenerator || (ThisCouldBeBetter.PlanetTopographyGenerator = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
