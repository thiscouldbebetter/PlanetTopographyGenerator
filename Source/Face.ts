
namespace ThisCouldBeBetter.PlanetTopographyGenerator
{

export class Face
{
	private _vertexIndices: number[];

	constructor(vertexIndices: number[])
	{
		this._vertexIndices = vertexIndices;
	}

	clone(): Face
	{
		return new Face(this._vertexIndices.slice(0));
	}

	vertexIndex(vi: number): number
	{
		return this._vertexIndices[vi];
	}

	vertexIndexAdd(vertexIndex: number): void
	{
		this._vertexIndices.push(vertexIndex);
	}

	vertexIndices(): number[]
	{
		// todo - Remove this.
		return this._vertexIndices;
	}

	vertexCount(): number
	{
		return this._vertexIndices.length;
	}

	vertices(mesh: Mesh): Vertex[]
	{
		var returnVertices = [];

		var vertexCount = this.vertexCount();

		for (var vi = 0; vi < vertexCount; vi++)
		{
			var vertexIndex = this.vertexIndex(vi);
			var vertex = mesh.vertices[vertexIndex];
			returnVertices.push(vertex);
		}

		return returnVertices;
	}
}

}