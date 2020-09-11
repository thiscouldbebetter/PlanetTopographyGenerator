
class PlanetTopographyGenerator
{
	generate(timesToSubdivide)
	{
		var timeStart = new Date();

		var meshInitial = MeshHelper.buildOctahedron("World");
		var meshes = [ meshInitial ];

		var mesh = meshInitial;
		for (var i = 0; i < timesToSubdivide; i++)
		{
			mesh = mesh.clone();
			mesh.subdivide();
			MeshHelper.meshSpherify(mesh, 1);
			meshes.push(mesh);
		}

		var timeEnd = new Date();
		var durationInMilliseconds = timeEnd - timeStart;

		var scenes = [];

		for (var i = 0; i < meshes.length; i++)
		{
			var mesh = meshes[i];

			var camera = new Camera
			(
				"Camera0",
				200, // focalLength
				new Coords(200, 200, 200), // viewSize
				new Location
				(
					new Coords(1, 1, -1), // pos
					new Orientation
					(
						new Coords(-1, -1, 1), // forward
						new Coords(0, 0, 1) // down
					)
				)
			);

			camera.constraints.push
			(
				new Constraint_MaintainDistance
				(
					new Coords(0, 0, 0), // center
					(camera.focalLength / 80) // distanceToMaintain
				)
			);

			camera.constraints.push
			(
				new Constraint_LookAtBody
				(
					new Empty
					(
						new Location
						(
							new Coords(0, 0, 0),
							new Orientation
							(
								new Coords(1, 0, 0),
								new Coords(0, 0, 1)
							)
						)
					)
				)
			);

			camera.constraints.addLookups("name");

			var scene = new Scene(mesh, camera);

			scenes.push(scene);
		}

		Globals.Instance.initialize(scenes);
	}
}
