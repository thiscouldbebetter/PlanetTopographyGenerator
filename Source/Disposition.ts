
namespace ThisCouldBeBetter.PlanetTopographyGenerator
{

export class Disposition
{
	pos: Coords;
	orientation: Orientation;

	constructor(pos: Coords, orientation: Orientation)
	{
		this.pos = pos;
		this.orientation = orientation;
	}
}

}
