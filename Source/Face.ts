
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

	vertexCount(): number
	{
		return this._vertexIndices.length;
	}

}

}