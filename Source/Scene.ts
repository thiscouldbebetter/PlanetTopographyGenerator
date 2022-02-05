
namespace ThisCouldBeBetter.PlanetTopographyGenerator
{

export class Scene
{
	mesh: Mesh;
	camera: Camera;

	display: Display;

	constructor(mesh: Mesh, camera: Camera)
	{
		this.mesh = mesh;
		this.camera = camera;
	}

	draw(): void
	{
		if (this.display == null)
		{
			var displaySize = this.camera.viewSize;
			this.display = new Display(displaySize);
			this.display.initialize();
		}

		this.camera.constraintsApply();

		this.display.clear();
		this.display.drawMeshForCamera
		(
			this.mesh,
			this.camera
		);
	}
}

}