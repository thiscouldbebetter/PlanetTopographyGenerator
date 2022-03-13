
namespace ThisCouldBeBetter.PlanetTopographyGenerator
{

export class Mesh
{
	name: string;
	vertices: Vertex[];
	faces: Face[];

	constructor
	(
		name: string,
		vertices: Vertex[],
		faces: Face[]
	)
	{
		this.name = name;
		this.vertices = vertices;
		this.faces = faces;
	}

	edges(): Edge[][]
	{
		var edgesByVertexIndex = new Array<Edge[]>();

		for (var f = 0; f < this.faces.length; f++)
		{
			var face = this.faces[f];
			this.edges_Face(face, edgesByVertexIndex);
		}

		return edgesByVertexIndex;
	}

	edges_Face
	(
		face: Face,
		edgesByVertexIndex: Edge[][]
	): void
	{
		var numberOfVerticesInFace = face.vertexCount();

		for (var vi = 0; vi < numberOfVerticesInFace; vi++)
		{
			var viNext = vi + 1;
			if (viNext >= numberOfVerticesInFace)
			{
				viNext = 0;
			}

			var vertexIndex = face.vertexIndex(vi);
			var vertexIndexNext = face.vertexIndex(viNext);

			var vertexIndexMin =
				Math.min(vertexIndex, vertexIndexNext);
			var vertexIndexMax =
				Math.max(vertexIndex, vertexIndexNext);

			var edgesForVertexIndexMin =
				edgesByVertexIndex[vertexIndexMin];
			if (edgesForVertexIndexMin == null)
			{
				edgesForVertexIndexMin = new Array<Edge>();
				edgesByVertexIndex[vertexIndexMin] =
					edgesForVertexIndexMin;
			}

			if (edgesForVertexIndexMin[vertexIndexMax] == null)
			{
				var vertex = this.vertices[vertexIndex];
				var vertexNext = this.vertices[vertexIndexNext];
				var edge = new Edge([vertex, vertexNext]);
				edgesForVertexIndexMin[vertexIndexMax] = edge;
			}
		}
	}

	subdivide(altitudeOffsetMax: number, randomizer: Randomizer): Mesh
	{
		var edgesByVertexIndex = this.edges();

		var vertexCountBeforeSubdivide = this.vertices.length;

		var edgeMidpoints =
			this.subdivide_Midpoints(edgesByVertexIndex);

		var verticesJustCreated =
			this.vertices.slice(vertexCountBeforeSubdivide);

		this.subdivide_Altitudes
		(
			verticesJustCreated,
			altitudeOffsetMax,
			randomizer
		);

		var facesAfterSubdivide =
			this.subdivide_Faces(edgesByVertexIndex, edgeMidpoints);
		this.faces = facesAfterSubdivide;
		return this;
	}

	subdivide_Midpoints
	(
		edgesByVertexIndex: Edge[][]
	): number[][]
	{
		var edgeMidpoints = new Array<number[]>();

		for (var vMin in edgesByVertexIndex)
		{
			var edgeMidpointsForVertexIndexMin = new Array<number>();
			var edgesForVertexIndexMin = edgesByVertexIndex[vMin];
			var numberOfEdges = edgesForVertexIndexMin.length;
			for (var vMax = 0; vMax < numberOfEdges; vMax++)
			{
				var edge = edgesForVertexIndexMin[vMax];
				if (edge != null)
				{
					var edgeVertices = edge.vertices;
					var edgeVertex0 = edgeVertices[0];
					var edgeMidpoint = Vertex.interpolate
					(
						edgeVertex0, edgeVertices[1]
					);

					edgeMidpointsForVertexIndexMin[vMax] = 
						this.vertices.length;
					this.vertices.push(edgeMidpoint);
				}
			}

			edgeMidpoints[vMin] =
				edgeMidpointsForVertexIndexMin;
		}

		return edgeMidpoints;
	}

	subdivide_Altitudes
	(
		verticesToOffset: Vertex[],
		altitudeOffsetMax: number,
		randomizer: Randomizer
	): void
	{
		for (var i = 0; i < verticesToOffset.length; i++)
		{
			var vertex = verticesToOffset[i];

			var random = 2 * randomizer.fraction() - 1;
			var altitudeOffset = random * altitudeOffsetMax;
			vertex.value += altitudeOffset;
		}
	}

	subdivide_Faces
	(
		edgesByVertexIndex: Edge[][],
		edgeMidpoints: number[][]
	): Face[]
	{
		var facesAfterSubdivide = [];

		for (var f = 0; f < this.faces.length; f++)
		{
			var faceParent = this.faces[f];
			var faceParentVertexCount = faceParent.vertexCount();

			// var edgeMidpointsForParent = [];

			var faceCentral = new Face([]);

			for (var vi = 0; vi < faceParentVertexCount; vi++)
			{
				var viPrev = vi - 1; 
				if (viPrev < 0)
				{
					viPrev = faceParentVertexCount - 1;
				}

				var viNext = vi + 1; 
				if (viNext >= faceParentVertexCount)
				{
					viNext = 0;
				}

				var vertexIndex = faceParent.vertexIndex(vi);
				var vertexIndexPrev = faceParent.vertexIndex(viPrev);
				var vertexIndexNext = faceParent.vertexIndex(viNext);

				var edgeVertexIndexMin = 
					Math.min(vertexIndex, vertexIndexNext);
				var edgeVertexIndexMax = 
					Math.max(vertexIndex, vertexIndexNext);	

				// var edgeParent = 
					// edgesByVertexIndex[edgeVertexIndexMin][edgeVertexIndexMax];

				var edgePrevVertexIndexMin = 
					Math.min(vertexIndex, vertexIndexPrev);
				var edgePrevVertexIndexMax = 
					Math.max(vertexIndex, vertexIndexPrev);

				// var edgeParentPrev = 
					//	edgesByVertexIndex[edgePrevVertexIndexMin][edgePrevVertexIndexMax];

				var vertexIndexOfEdgeParentMidpoint = 
					edgeMidpoints[edgeVertexIndexMin][edgeVertexIndexMax];
				var vertexIndexOfEdgeParentMidpointPrev = 
					edgeMidpoints[edgePrevVertexIndexMin][edgePrevVertexIndexMax];

				faceCentral.vertexIndexAdd
				(
					vertexIndexOfEdgeParentMidpoint
				);

				var faceCorner = new Face
				([
					vertexIndex,
					vertexIndexOfEdgeParentMidpoint,
					vertexIndexOfEdgeParentMidpointPrev, 
				]);

				facesAfterSubdivide.push(faceCorner);
			}

			facesAfterSubdivide.push
			(
				faceCentral
			);
		}

		return facesAfterSubdivide;
	}

	// clone

	clone(): Mesh
	{
		var returnValue = new Mesh
		(
			this.name + "_Clone", 
			this.vertices.map(x => x.clone()), 
			this.faces.map(x => x.clone())
		);
		
		return returnValue;
	}
}

}