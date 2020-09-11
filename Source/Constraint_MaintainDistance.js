
class Constraint_MaintainDistance
{
	constructor(center, distanceToMaintain)
	{
		this.name = "MaintainDistance";
		this.center = center;
		this.distanceToMaintain = distanceToMaintain;
	}

	applyToBody(body)
	{
		var bodyPos = body.loc.pos;

		var directionFromCenterToBody = bodyPos.clone().subtract
		(
			this.center
		).normalize();

		bodyPos.overwriteWith
		(
			this.center
		).add
		(
			directionFromCenterToBody.multiplyScalar
			(
				this.distanceToMaintain
			)
		);
	}
}
