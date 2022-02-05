
namespace ThisCouldBeBetter.PlanetTopographyGenerator
{

export class InputHelper
{
	handleEventKeyDown(event: any): void
	{
		var key = event.key;

		var scenes = Globals.Instance.scenes;
		for (var i = 0; i < scenes.length; i++)
		{
			var scene = scenes[i];
			this.handleEventKeyDown_Scene(key, scene);
		}
	}

	handleEventKeyDown_Scene(key: string, scene: Scene): void
	{
		var camera = scene.camera;
		var cameraLoc = camera.loc;
		var cameraPos = cameraLoc.pos;
		var cameraOrientation = cameraLoc.orientation;
		var constraintLook =
			camera.constraints.find(x => x.name == "LookAtBody") as Constraint_LookAtBody;

		var amountToRotate = .1;

		if (key == "a")
		{
			cameraPos.subtract
			(
				cameraOrientation.right.multiplyScalar
				(
					amountToRotate
				)
			);
		}
		else if (key == "c")
		{
			constraintLook.targetBody.loc.pos.add
			(
				cameraOrientation.right
			);
		}
		else if (key == "d")
		{
			cameraPos.add
			(
				cameraOrientation.right.multiplyScalar
				(
					amountToRotate
				)
			);
		}
		else if (key == "s")
		{
			cameraPos.add
			(
				cameraOrientation.down.multiplyScalar
				(
					amountToRotate
				)
			);
		}
		else if (key == "w")
		{
			cameraPos.subtract
			(
				cameraOrientation.down.multiplyScalar
				(
					amountToRotate
				)
			);
		}
		else if (key == "z")
		{
			constraintLook.targetBody.loc.pos.subtract
			(
				cameraOrientation.right
			);
		}
		
		scene.draw();
	}

	initialize(): void
	{
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
	}
}

}
