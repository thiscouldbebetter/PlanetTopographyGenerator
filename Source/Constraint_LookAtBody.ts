
namespace ThisCouldBeBetter.PlanetTopographyGenerator
{

export class Constraint_LookAtBody implements Constraint
{
	name: string;
	targetBody: Constrainable;

	constructor(targetBody: Constrainable)
	{
		this.name = "LookAtBody";
		this.targetBody = targetBody;
	}

	applyToBody(body: Constrainable): void
	{
		var bodyOrientationForward =
			this.targetBody.loc.pos.clone().subtract
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

}