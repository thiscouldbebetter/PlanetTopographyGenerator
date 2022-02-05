
namespace ThisCouldBeBetter.PlanetTopographyGenerator
{

export class PlanetTopographyGenerator
{
	shapeInitial: Shape;
	timesToSubdivide: number;
	terrainGroup: TerrainGroup;

	constructor
	(
		shapeInitial: Shape,
		timesToSubdivide: number,
		terrainGroup: TerrainGroup
	)
	{
		this.shapeInitial = shapeInitial;
		this.timesToSubdivide = timesToSubdivide;
		this.terrainGroup = terrainGroup;
	}

	generate(): void
	{
		//var timeStart = new Date();

		var meshInitial = this.shapeInitial.toMesh();

		var meshes = [ meshInitial ];

		var mesh = meshInitial;
		for (var i = 0; i < this.timesToSubdivide; i++)
		{
			mesh = mesh.clone();
			var altitudeOffsetMax = 1 / Math.pow(2, i + 1);
			mesh.subdivide(altitudeOffsetMax);
			mesh = this.shapeInitial.meshProcessAfterSubdivide
			(
				mesh
			);
			meshes.push(mesh);
		}

		//var timeEnd = new Date();
		//var durationInMilliseconds = timeEnd - timeStart;

		var scenes = [];

		for (var i = 0; i < meshes.length; i++)
		{
			var mesh = meshes[i];

			var camera = new Camera
			(
				"Camera0",
				200, // focalLength
				new Coords(200, 200, 200), // viewSize
				new Disposition
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
						new Disposition
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

			var scene = new Scene(mesh, camera);

			scenes.push(scene);
		}

		Globals.Instance.initialize(scenes);
	}
}

}
