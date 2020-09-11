
class Scene
{
	constructor(mesh, camera)
	{
		this.mesh = mesh;
		this.camera = camera;
	}

	draw()
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
