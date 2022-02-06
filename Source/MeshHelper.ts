
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

	static buildTube(name: string): Mesh
	{
		var vertices =
		[
			// top
			new Coords(-1, -1, -1), // 0 - nw
			new Coords(1, -1, -1), // 1 - ne
			new Coords(1, 1, -1), // 2 - se
			new Coords(-1, 1, -1), // 3 - sw

			// bottom
			new Coords(-1, -1, 1), // 4 - nw
			new Coords(1, -1, 1), // 5 - ne
			new Coords(1, 1, 1), // 6 - se
			new Coords(-1, 1, 1), // 7 - sw
		].map
		(
			x => Vertex.fromPos(x)
		);

		var faces =
		[
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

	static meshCylindrify
	(
		meshToCylindrify: Mesh,
		radius: number
	): Mesh
	{
		var centerOfCylinder = new Coords(0, 0, 0);

		var vertices = meshToCylindrify.vertices;
		var numberOfVertices = vertices.length;

		if (radius == null)
		{
			var sumOfDistances = 0;

			var displacementOfVertexFromAxis =
				new Coords(0, 0, 0);

			for (var i = 0; i < numberOfVertices; i++)
			{
				var vertex = vertices[i];
				var vertexPos = vertex.pos;
				var vertexPosZ = vertexPos.z;
				vertexPos.z = 0;

				displacementOfVertexFromAxis.overwriteWith
				(
					vertexPos
				).subtract
				(
					centerOfCylinder
				);

				var distanceOfVertexFromAxis = 
					displacementOfVertexFromAxis.magnitude();

				sumOfDistances += distanceOfVertexFromAxis;

				vertexPos.z = vertexPosZ;
			}

			radius = sumOfDistances / numberOfVertices;
		}

		for (var i = 0; i < numberOfVertices; i++)
		{
			var vertex = vertices[i];
			var vertexPos = vertex.pos;
			var vertexPosZ = vertexPos.z;
			vertexPos.z = 0;

			vertexPos.normalize().multiplyScalar(radius);

			vertexPos.z = vertexPosZ;
		}

		return meshToCylindrify;
	}

	static meshScale(meshToScale: Mesh, scaleFactors: Coords): Mesh
	{
		meshToScale.vertices.forEach(x => x.pos.multiply(scaleFactors) );
		return meshToScale;
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