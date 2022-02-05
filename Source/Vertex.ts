
namespace ThisCouldBeBetter.PlanetTopographyGenerator
{

export class Vertex
{
	pos: Coords;
	depth: number;
	altitude: number;

	edges: number[][];
	faces: number[][];

	constructor(pos: Coords, depth: number, altitude: number)
	{
		this.pos = pos;
		this.depth = (depth == null ? 0 : depth);
		this.altitude = (altitude == null ? 0.5 : altitude);

		this.edges = [];
		this.faces = [];
	}

	static fromPos(pos: Coords): Vertex
	{
		return new Vertex(pos, null, null);
	}

	// static methods

	static interpolate(vertex0: Vertex, vertex1: Vertex): Vertex
	{
		var pos = vertex0.pos.clone().add
		(
			vertex1.pos
		).half();

		var depth = vertex0.depth + 1;

		var altitudeInterpolated = 
		(
			vertex0.altitude 
			+ vertex1.altitude
		) / 2;
		var altitudeOffsetMax = 1 / Math.pow(2, depth);
		var random = 2 * Math.random() - 1;
		var altitudeOffset = random * altitudeOffsetMax;
		var altitude = altitudeInterpolated + altitudeOffset;

		var returnValue = new Vertex(pos, depth, altitude);

		return returnValue;
	}

	static positionsForMany(vertices: Vertex[]): Coords[]
	{
		var returnValues = [];

		for (var i = 0; i < vertices.length; i++)
		{
			returnValues.push(vertices[i].pos);
		}

		return returnValues;
	}

	// instance methods

	clone(): Vertex
	{
		return new Vertex
		(
			this.pos.clone(), this.depth, this.altitude
		);
	}
}

}
