
namespace ThisCouldBeBetter.PlanetTopographyGenerator
{

export class Mesh
{
	name: string;
	vertices: Vertex[];
	faces: number[][];

	constructor
	(
		name: string,
		vertices: Vertex[],
		faces: number[][]
	)
	{
		this.name = name;
		this.vertices = vertices;
		this.faces = faces;
	}

	edges(): Vertex[][][]
	{
		var edgesByVertexIndex = new Array<Vertex[][]>();

		for (var f = 0; f < this.faces.length; f++)
		{
			var face = this.faces[f];
			this.edges_Face(face, edgesByVertexIndex);
		}

		return edgesByVertexIndex;
	}

	edges_Face
	(
		face: number[],
		edgesByVertexIndex: Vertex[][][]
	): void
	{
		var numberOfVerticesInFace = face.length;

		for (var vi = 0; vi < numberOfVerticesInFace; vi++)
		{
			var viNext = vi + 1;
			if (viNext >= numberOfVerticesInFace)
			{
				viNext = 0;
			}

			var vertexIndex = face[vi];
			var vertexIndexNext = face[viNext];

			var vertexIndexMin =
				Math.min(vertexIndex, vertexIndexNext);
			var vertexIndexMax =
				Math.max(vertexIndex, vertexIndexNext);

			var edgesForVertexIndexMin =
				edgesByVertexIndex[vertexIndexMin];
			if (edgesForVertexIndexMin == null)
			{
				edgesForVertexIndexMin = new Array<Vertex[]>();
				edgesByVertexIndex[vertexIndexMin] =
					edgesForVertexIndexMin;
			}

			if (edgesForVertexIndexMin[vertexIndexMax] == null)
			{
				var vertex = this.vertices[vertexIndex];
				var vertexNext = this.vertices[vertexIndexNext];
				var edge = [vertex, vertexNext];
				edgesForVertexIndexMin[vertexIndexMax] = edge;
			}
		}
	}

	subdivide(): Mesh
	{
		var edgesByVertexIndex = this.edges();
		var edgeMidpoints =
			this.subdivide_Midpoints(edgesByVertexIndex);
		var facesAfterSubdivide =
			this.subdivide_Faces(edgesByVertexIndex, edgeMidpoints);
		this.faces = facesAfterSubdivide;
		return this;
	}

	subdivide_Midpoints(edgesByVertexIndex: Vertex[][][]): number[][]
	{
		var edgeMidpoints = new Array<number[]>();

		for (var vMin in edgesByVertexIndex)
		{
			var edgeMidpointsForVertexIndexMin = new Array<number>();
			var edgesForVertexIndexMin = edgesByVertexIndex[vMin];
			var numberOfEdges = edgesForVertexIndexMin.length;
			for (var vMax = 0; vMax < numberOfEdges; vMax++)
			{
				var edgeVertices = edgesForVertexIndexMin[vMax];
				if (edgeVertices != null)
				{
					var edgeMidpoint = Vertex.interpolate
					(
						edgeVertices[0], edgeVertices[1]
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

	subdivide_Faces
	(
		edgesByVertexIndex: Vertex[][][],
		edgeMidpoints: number[][]
	): number[][]
	{
		var facesAfterSubdivide = [];

		for (var f = 0; f < this.faces.length; f++)
		{
			var faceParent = this.faces[f];

			// var edgeMidpointsForParent = [];

			var faceCentral = [];

			for (var vi = 0; vi < faceParent.length; vi++)
			{
				var viPrev = vi - 1; 
				if (viPrev < 0)
				{
					viPrev = faceParent.length - 1;
				}

				var viNext = vi + 1; 
				if (viNext >= faceParent.length)
				{
					viNext = 0;
				}

				var vertexIndex = faceParent[vi];
				var vertexIndexPrev = faceParent[viPrev];
				var vertexIndexNext = faceParent[viNext];

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

				faceCentral.push(vertexIndexOfEdgeParentMidpoint);

				var faceCorner = 
				[
					vertexIndex,
					vertexIndexOfEdgeParentMidpoint,
					vertexIndexOfEdgeParentMidpointPrev, 
				];

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
			this.faces.map(x => x.slice(0))
		);
		
		return returnValue;
	}
}

}