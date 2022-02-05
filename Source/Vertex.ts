
namespace ThisCouldBeBetter.PlanetTopographyGenerator
{

export class Vertex
{
	pos: Coords;
	value: any;

	constructor
	(
		pos: Coords,
		value: any
	)
	{
		this.pos = pos;
		this.value = (value == null ? 0.5 : value);
	}

	static fromPos(pos: Coords): Vertex
	{
		return new Vertex(pos, null);
	}

	// static methods

	static interpolate(vertex0: Vertex, vertex1: Vertex): Vertex
	{
		var pos = vertex0.pos.clone().add
		(
			vertex1.pos
		).half();

		var valueInterpolated = 
		(
			vertex0.value 
			+ vertex1.value
		) / 2;

		var returnValue = new Vertex
		(
			pos,
			valueInterpolated
		);

		return returnValue;
	}

	// instance methods

	clone(): Vertex
	{
		return new Vertex
		(
			this.pos.clone(),
			this.value
		);
	}
}

}
