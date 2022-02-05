
namespace ThisCouldBeBetter.PlanetTopographyGenerator
{

export class MeshHelper
{
	static buildOctahedron(name: string): Mesh
	{
		var vertices =
		[ 
			new Coords(0, 0, -1), // 0 - top
			new Coords(1, 0, 0), // 1 - east
			new Coords(0, 1, 0), // 2 - south
			new Coords(-1, 0, 0), // 3 - west
			new Coords(0, -1, 0), // 4 - north
			new Coords(0, 0, 1), // 5 - bottom
		].map
		(
			x => Vertex.fromPos(x)
		);

		var faces =
		[
			[0, 2, 1], // top southeast
			[0, 3, 2], // top southwest
			[0, 4, 3], // top northwest
			[0, 1, 4], // top northeast

			[5, 1, 2], // bottom southeast
			[5, 2, 3], // bottom southwest
			[5, 3, 4], // bottom northwest
			[5, 4, 1], // bottom northeast
		].map
		(
			x => new Face(x)
		);

		var returnValue = new Mesh
		(
			name, 
			vertices,
			faces
		);

		return returnValue;
	}

	static buildSquare(name: string): Mesh
	{
		var vertices =
		[ 
			new Coords(-1, -1, 0), // 0 - northwest
			new Coords(1, -1, 0), // 1 - northeast
			new Coords(1, 1, 0), // 2 - southeast
			new Coords(-1, 1, 0), // 3 - southwest
		].map
		(
			x => Vertex.fromPos(x)
		);

		var faces =
		[
			[ 0, 3, 1 ], // north and west
			[ 1, 3, 2 ], // south and east
		].map
		(
			x => new Face(x)
		);

		var returnValue = new Mesh
		(
			name, 
			vertices,
			faces
		);

		return returnValue;
	}

	static meshSpherify
	(
		meshToSpherify: Mesh,
		radius: number
	): Mesh
	{
		var centerOfSphere = new Coords(0, 0, 0);

		var vertices = meshToSpherify.vertices;
		var numberOfVertices = vertices.length;
		
		if (radius == null)
		{
			var sumOfDistances = 0;

			var displacementOfVertexFromCenter =
				new Coords(0, 0, 0);

			for (var i = 0; i < numberOfVertices; i++)
			{
				var vertex = vertices[i];
				var vertexPos = vertex.pos;

				displacementOfVertexFromCenter.overwriteWith
				(
					vertexPos
				).subtract
				(
					centerOfSphere
				);

				var distanceOfVertexFromCenter = 
					displacementOfVertexFromCenter.magnitude();

				sumOfDistances += distanceOfVertexFromCenter;
			}

			radius = sumOfDistances / numberOfVertices;
		}

		for (var i = 0; i < numberOfVertices; i++)
		{
			var vertex = vertices[i];
			vertex.pos.normalize().multiplyScalar(radius);
		}

		return meshToSpherify;
	}

}

}