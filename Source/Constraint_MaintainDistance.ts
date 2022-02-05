
namespace ThisCouldBeBetter.PlanetTopographyGenerator
{

export class Constraint_MaintainDistance implements Constraint
{
	name: string;
	center: Coords;
	distanceToMaintain: number;

	constructor(center: Coords, distanceToMaintain: number)
	{
		this.name = "MaintainDistance";
		this.center = center;
		this.distanceToMaintain = distanceToMaintain;
	}

	applyToBody(body: Constrainable): void
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

}
