
class Constraint_LookAtBody
{
	constructor(targetBody)
	{
		this.name = "LookAtBody";
		this.targetBody = targetBody;
	}

	applyToBody(body)
	{
		var bodyOrientationForward = this.targetBody.loc.pos.clone().subtract
		(
			body.loc.pos
		).normalize();

		body.loc.orientation = new Orientation
		(
			bodyOrientationForward,
			body.loc.orientation.down
		);
	}
}
