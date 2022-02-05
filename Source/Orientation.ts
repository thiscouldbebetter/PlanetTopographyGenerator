
namespace ThisCouldBeBetter.PlanetTopographyGenerator
{

export class Orientation
{
	forward: Coords;
	down: Coords;
	right: Coords;

	axes: Coords[];

	constructor(forward: Coords, down: Coords)
	{
		this.forward = forward.clone().normalize();
		this.down = down.clone().normalize();
		this.right = this.down.clone().crossProduct(this.forward).normalize();

		this.down = this.forward.clone().crossProduct(this.right).normalize();

		this.axes = 
		[
			this.forward,
			this.right,
			this.down,
		];
	}

	clone(): Orientation
	{
		return new Orientation
		(
			this.forward,
			this.down
		);
	}

	overwriteWith(other: Orientation): Orientation
	{
		this.forward.overwriteWith(other.forward);
		this.right.overwriteWith(other.right);
		this.down.overwriteWith(other.down);

		return this;
	}
}

}