
namespace ThisCouldBeBetter.PlanetTopographyGenerator
{

export class Camera
{
	name: string;
	focalLength: number;
	viewSize: Coords;
	loc: Disposition;

	viewSizeHalf: Coords;
	constraints: Constraint[];

	constructor
	(
		name: string,
		focalLength: number,
		viewSize: Coords,
		loc: Disposition
	)
	{
		this.name = name;
		this.focalLength = focalLength;
		this.viewSize = viewSize;
		this.loc = loc;

		this.viewSizeHalf = this.viewSize.clone().half();
		this.constraints = [];
	}

	convertWorldCoordsToViewCoords(coordsToConvert: Coords): Coords
	{
		var orientation = this.loc.orientation;

		coordsToConvert.subtract
		(
			this.loc.pos
		);

		var distanceAlongCameraForward = coordsToConvert.dotProduct
		(
			orientation.forward
		);

		coordsToConvert.overwriteWithXYZ
		(
			coordsToConvert.dotProduct(orientation.right),
			coordsToConvert.dotProduct(orientation.down),
			distanceAlongCameraForward
		);

		if (this.focalLength != null)
		{
			coordsToConvert.multiplyScalar
			(
				this.focalLength
			).divideScalar
			(
				distanceAlongCameraForward
			);
		}

		coordsToConvert.add
		(
			this.viewSizeHalf
		);

		return coordsToConvert;
	}

	// scene

	constraintsApply(): void
	{
		for (var i = 0; i < this.constraints.length; i++)
		{
			var constraint = this.constraints[i];

			constraint.applyToBody(this);
		}
	}
}

}