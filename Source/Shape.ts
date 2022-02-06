
namespace ThisCouldBeBetter.PlanetTopographyGenerator
{

export class Shape
{
	name: string;
	toMesh: () => Mesh;
	meshProcessAfterSubdivide: (m: Mesh) => Mesh;

	constructor
	(
		name: string,
		toMesh: () => Mesh,
		meshProcessAfterSubdivide: (m: Mesh) => Mesh
	)
	{
		this.name = name;
		this.toMesh = toMesh;
		this.meshProcessAfterSubdivide = meshProcessAfterSubdivide;
	}

	static _instances: Shape_Instances;
	static Instances(): Shape_Instances
	{
		if (Shape._instances == null)
		{
			Shape._instances = new Shape_Instances();
		}
		return Shape._instances;
	}

	static byName(name: string): Shape
	{
		return Shape.Instances().byName(name);
	}
}

export class Shape_Instances
{
	Octahedron: Shape;
	Square: Shape;
	Tube: Shape;

	_All: Shape[];
	_AllByName: Map<string, Shape>;

	constructor()
	{
		this.Octahedron = new Shape
		(
			"Octahedron",
			() => MeshHelper.buildOctahedron("Octahedron"),
			(m: Mesh) => MeshHelper.meshSpherify(m, 1)
		);

		this.Square = new Shape
		(
			"Square",
			() => MeshHelper.buildSquare("Square"),
			(m: Mesh) => m
		);

		this.Tube = new Shape
		(
			"Tube",
			() => MeshHelper.buildTube("Tube"),
			(m: Mesh) => MeshHelper.meshCylindrify(m, 1)
		);

		this._All =
		[
			this.Octahedron,
			this.Square,
			this.Tube
		];

		this._AllByName = new Map(this._All.map(x => [x.name, x]));
	}

	byName(shapeName: string): Shape
	{
		return this._AllByName.get(shapeName);
	}
}

}