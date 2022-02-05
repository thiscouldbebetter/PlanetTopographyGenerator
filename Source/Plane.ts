
namespace ThisCouldBeBetter.PlanetTopographyGenerator
{

export class Plane
{
	normal: Coords;
	distanceFromOrigin: number;

	constructor(normal: Coords, distanceFromOrigin: number)
	{
		this.normal = normal;
		this.distanceFromOrigin = distanceFromOrigin;
	}

	static fromPoints(points: Coords[]): Plane
	{
		return new Plane(new Coords(0, 0, 0), 0).fromPoints(points);
	}

	fromPoints(points: Coords[]): Plane
	{
		var point0 = points[0];
		var displacementFromPoint0To1 = 
			points[1].clone().subtract(point0);
		var displacementFromPoint0To2 = 
			points[2].clone().subtract(point0);
		this.normal.overwriteWith
		(
			displacementFromPoint0To1
		).crossProduct
		(
			displacementFromPoint0To2
		).normalize();

		this.distanceFromOrigin = this.normal.dotProduct(point0);

		return this;
	}
}

}