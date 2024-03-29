"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var PlanetTopographyGenerator;
    (function (PlanetTopographyGenerator) {
        class MeshHelper {
            static buildOctahedron(name) {
                var vertices = [
                    new PlanetTopographyGenerator.Coords(0, 0, -1),
                    new PlanetTopographyGenerator.Coords(1, 0, 0),
                    new PlanetTopographyGenerator.Coords(0, 1, 0),
                    new PlanetTopographyGenerator.Coords(-1, 0, 0),
                    new PlanetTopographyGenerator.Coords(0, -1, 0),
                    new PlanetTopographyGenerator.Coords(0, 0, 1), // 5 - bottom
                ].map(x => PlanetTopographyGenerator.Vertex.fromPos(x));
                var faces = [
                    [0, 2, 1],
                    [0, 3, 2],
                    [0, 4, 3],
                    [0, 1, 4],
                    [5, 1, 2],
                    [5, 2, 3],
                    [5, 3, 4],
                    [5, 4, 1], // bottom northeast
                ].map(x => new PlanetTopographyGenerator.Face(x));
                var returnValue = new PlanetTopographyGenerator.Mesh(name, vertices, faces);
                return returnValue;
            }
            static buildSquare(name) {
                var vertices = [
                    new PlanetTopographyGenerator.Coords(-1, -1, 0),
                    new PlanetTopographyGenerator.Coords(1, -1, 0),
                    new PlanetTopographyGenerator.Coords(1, 1, 0),
                    new PlanetTopographyGenerator.Coords(-1, 1, 0), // 3 - southwest
                ].map(x => PlanetTopographyGenerator.Vertex.fromPos(x));
                var faces = [
                    [0, 3, 1],
                    [1, 3, 2], // south and east
                ].map(x => new PlanetTopographyGenerator.Face(x));
                var returnValue = new PlanetTopographyGenerator.Mesh(name, vertices, faces);
                return returnValue;
            }
            static buildTube(name) {
                var vertices = [
                    // top
                    new PlanetTopographyGenerator.Coords(-1, -1, -1),
                    new PlanetTopographyGenerator.Coords(1, -1, -1),
                    new PlanetTopographyGenerator.Coords(1, 1, -1),
                    new PlanetTopographyGenerator.Coords(-1, 1, -1),
                    // bottom
                    new PlanetTopographyGenerator.Coords(-1, -1, 1),
                    new PlanetTopographyGenerator.Coords(1, -1, 1),
                    new PlanetTopographyGenerator.Coords(1, 1, 1),
                    new PlanetTopographyGenerator.Coords(-1, 1, 1), // 7 - sw
                ].map(x => PlanetTopographyGenerator.Vertex.fromPos(x));
                var faces = [
                    // top
                    // north
                    [0, 1, 5],
                    [0, 5, 4],
                    // east
                    [1, 2, 6],
                    [1, 6, 5],
                    // south
                    [2, 3, 7],
                    [2, 7, 6],
                    // west
                    [3, 0, 4],
                    [3, 4, 7]
                ].map(x => new PlanetTopographyGenerator.Face(x));
                var returnValue = new PlanetTopographyGenerator.Mesh(name, vertices, faces);
                return returnValue;
            }
            static meshCylindrify(meshToCylindrify, radius) {
                var centerOfCylinder = new PlanetTopographyGenerator.Coords(0, 0, 0);
                var vertices = meshToCylindrify.vertices;
                var numberOfVertices = vertices.length;
                if (radius == null) {
                    var sumOfDistances = 0;
                    var displacementOfVertexFromAxis = new PlanetTopographyGenerator.Coords(0, 0, 0);
                    for (var i = 0; i < numberOfVertices; i++) {
                        var vertex = vertices[i];
                        var vertexPos = vertex.pos;
                        var vertexPosZ = vertexPos.z;
                        vertexPos.z = 0;
                        displacementOfVertexFromAxis.overwriteWith(vertexPos).subtract(centerOfCylinder);
                        var distanceOfVertexFromAxis = displacementOfVertexFromAxis.magnitude();
                        sumOfDistances += distanceOfVertexFromAxis;
                        vertexPos.z = vertexPosZ;
                    }
                    radius = sumOfDistances / numberOfVertices;
                }
                for (var i = 0; i < numberOfVertices; i++) {
                    var vertex = vertices[i];
                    var vertexPos = vertex.pos;
                    var vertexPosZ = vertexPos.z;
                    vertexPos.z = 0;
                    vertexPos.normalize().multiplyScalar(radius);
                    vertexPos.z = vertexPosZ;
                }
                return meshToCylindrify;
            }
            static meshScale(meshToScale, scaleFactors) {
                meshToScale.vertices.forEach(x => x.pos.multiply(scaleFactors));
                return meshToScale;
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
                return meshToSpherify;
            }
        }
        PlanetTopographyGenerator.MeshHelper = MeshHelper;
    })(PlanetTopographyGenerator = ThisCouldBeBetter.PlanetTopographyGenerator || (ThisCouldBeBetter.PlanetTopographyGenerator = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
