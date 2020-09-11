
class Globals
{
	static Instance = new Globals();

	initialize(scenes)
	{
		this.scenes = scenes;

		var sceneSize = this.scenes[0].camera.viewSize;
		for (var i = 0; i < this.scenes.length; i++)
		{
			var scene = this.scenes[i];
			scene.draw();
		}
		
		this.inputHelper = new InputHelper();
		this.inputHelper.initialize();
	}
}
