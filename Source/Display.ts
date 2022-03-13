
namespace ThisCouldBeBetter.PlanetTopographyGenerator
{

export class Display
{
	size: Coords;

	colorBack: string;
	colorFore: string;

	canvas: any;
	graphics: any;

	_displacement: Coords;
	_drawPos: Coords;
	_plane: Plane;

	constructor(size: Coords)
	{
		this.size = size;

		this.colorBack = "Black";
		this.colorFore = "Gray";

		this._displacement = new Coords(0, 0, 0);
		this._drawPos = new Coords(0, 0, 0);
		this._plane = new Plane(new Coords(0, 0, 0), 0);
	}

	clear(): void
	{
		this.graphics.clearRect(0, 0, this.size.x, this.size.y);
	}

	drawPos: Coords;
	drawMeshForCamera(mesh: Mesh, camera: Camera): void
	{
		this.drawPos = new Coords(0, 0, 0);

		var faces = mesh.faces;

		for (var f = 0; f < faces.length; f++)
		{
			var face = faces[f];
			this.drawMeshForCamera_Face(mesh, camera, face)
		}
	}

	drawMeshForCamera_Face(mesh: Mesh, camera: Camera, face: Face): void
	{
		var cameraPos = camera.loc.pos;
		var displacementFromCameraToFaceVertex0 = new Coords(0, 0, 0);

		var verticesInFace = face.vertices(mesh);
		var positionsOfVerticesInFace = verticesInFace.map(x => x.pos);
		var faceNormal = Plane.fromPoints(positionsOfVerticesInFace).normal;

		displacementFromCameraToFaceVertex0.overwriteWith
		(
			verticesInFace[0].pos
		).subtract
		(
			cameraPos
		);

		var faceNormalDotDisplacement = faceNormal.dotProduct
		(
			displacementFromCameraToFaceVertex0
		);

		var doesFacePointTowardCamera = (faceNormalDotDisplacement < 0);

		if (doesFacePointTowardCamera)
		{
			this.drawMeshForCamera_Face_FacingCamera
			(
				mesh, camera, face, verticesInFace
			);
		}
	}

	drawMeshForCamera_Face_FacingCamera
	(
		mesh: Mesh,
		camera: Camera,
		face: Face,
		verticesInFace: Vertex[]
	): void
	{
		this.graphics.beginPath();

		var faceVertexCount = verticesInFace.length;
		var faceAltitude = 0;

		for (var vi = 0; vi < faceVertexCount; vi++)
		{
			var vertex = verticesInFace[vi];
			faceAltitude += vertex.value;

			camera.convertWorldCoordsToViewCoords
			(
				this.drawPos.overwriteWith(vertex.pos)
			);

			if (vi == 0)
			{
				this.graphics.moveTo
				(
					this.drawPos.x, this.drawPos.y
				);
			}
			else
			{
				this.graphics.lineTo
				(
					this.drawPos.x, this.drawPos.y
				);
			}

		}

		this.graphics.closePath();

		faceAltitude /= faceVertexCount;

		var terrainGroup = TerrainGroup.Instances().Earthlike; // hack
		var colorForFace =
			terrainGroup.colorAtAltitude(faceAltitude);

		this.graphics.fillStyle = colorForFace;
		this.graphics.strokeStyle = colorForFace;
		this.graphics.fill();
		this.graphics.stroke();
	}

	drawMeshProjectedMercator
	(
		meshToProject: Mesh
	): void
	{
		this.drawPos = new Coords(0, 0, 0);

		var meshProjected = meshToProject.clone();

		var meshVertexPositions = meshProjected.vertices.map(x => x.pos);
		var polar = Polar.create();
		meshVertexPositions.forEach
		(
			vertexPos =>
			{
				var vertexPosAsPolar = polar.fromCoords
				(
					vertexPos
				);

				vertexPos.overwriteWithXYZ
				(
					vertexPosAsPolar.azimuthInTurns,
					vertexPosAsPolar.elevationInTurns * 2,
					0
				);

				vertexPos.multiply
				(
					this.size
				);
			}
		);

		var camera = new Camera
		(
			Camera.name,
			null, // focalLength
			this.size.clone(),
			new Disposition
			(
				new Coords(this.size.x / 2, 0, 0),
				new Orientation
				(
					new Coords(0, 0, 1), // forward
					new Coords(0, 1, 0) // down
				)
			)
		);

		var meshFaces = meshProjected.faces;
		var faceIndexMax = meshFaces.length; //  * .37488; // hack - Have to split mesh first, or else the faces at the 0 boundary stretch across whole x-axis!
		for (var i = 0; i < faceIndexMax; i++)
		{
			var face = meshFaces[i];

			var verticesInFace = face.vertices(meshProjected);

			this.drawMeshForCamera_Face_FacingCamera
			(
				meshProjected, camera, face, verticesInFace
			);
		}
	}

	initialize(): void
	{
		this.canvas = document.createElement("canvas");

		this.canvas.width = this.size.x;
		this.canvas.height = this.size.y;

		this.graphics = this.canvas.getContext("2d");

		var divOutput = document.getElementById("divOutput");
		divOutput.appendChild(this.canvas);
	}
}

}