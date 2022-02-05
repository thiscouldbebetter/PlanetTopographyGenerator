
namespace ThisCouldBeBetter.PlanetTopographyGenerator
{

export class Globals
{
	inputHelper: InputHelper;
	scenes: Scene[];

	static Instance = new Globals();

	initialize(scenes: Scene[]): void
	{
		this.scenes = scenes;

		for (var i = 0; i < this.scenes.length; i++)
		{
			var scene = this.scenes[i];
			scene.draw();
		}
		
		this.inputHelper = new InputHelper();
		this.inputHelper.initialize();
	}
}

}
