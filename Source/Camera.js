
// classes

class Camera
{
	constructor(name, focalLength, viewSize, loc)
	{
		this.name = name;
		this.focalLength = focalLength;
		this.viewSize = viewSize;
		this.loc = loc;

		this.viewSizeHalf = this.viewSize.clone().half();
		this.constraints = [];
	}

	convertWorldCoordsToViewCoords(coordsToConvert)
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
		).multiplyScalar
		(
			this.focalLength
		).divideScalar
		(
			distanceAlongCameraForward
		).add
		(
			this.viewSizeHalf
		);
	}

	// scene

	constraintsApply()
	{
		for (var i = 0; i < this.constraints.length; i++)
		{
			var constraint = this.constraints[i];

			constraint.applyToBody(this);
		}
	}
}
