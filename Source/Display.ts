
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

	drawMeshForCamera(mesh: Mesh, camera: Camera): void
	{
		var faces = mesh.faces;

		var verticesInFace = new Array<Vertex>();

		for (var f = 0; f < faces.length; f++)
		{
			var face = faces[f];
			this.drawMeshForCamera_Face
			(
				mesh, camera, face, verticesInFace
			);
		}
	}

	drawMeshForCamera_Face
	(
		mesh: Mesh, camera: Camera, face: Face, verticesInFace: Vertex[]
	): void
	{
		verticesInFace.length = 0;

		this.drawMeshForCamera_Face_VerticesInFace
		(
			mesh, camera, face, verticesInFace
		);

		if (verticesInFace.length > 0)
		{
			this.drawMeshForCamera_Face_Draw
			(
				camera, face, verticesInFace
			);
		}
	}

	drawMeshForCamera_Face_VerticesInFace
	(
		mesh: Mesh,
		camera: Camera,
		face: Face,
		verticesInFace: Vertex[]
	): Vertex[]
	{
		var cameraPos = camera.loc.pos;

		var plane = this._plane;
		var displacementFromCameraToFaceVertex0 =
			this._displacement;

		var faceVertexCount = face.vertexCount();
		for (var vi = 0; vi < faceVertexCount; vi++)
		{
			var vertexIndex = face.vertexIndex(vi);
			var vertex = mesh.vertices[vertexIndex];
			verticesInFace.push(vertex);
		}

		var positionsOfVerticesInFace = 
			verticesInFace.map(x => x.pos);
		var faceNormal = 
			plane.fromPoints(positionsOfVerticesInFace).normal;

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

		if (doesFacePointTowardCamera == false)
		{
			verticesInFace = null;
		}

		return verticesInFace;
	}

	drawMeshForCamera_Face_Draw
	(
		camera: Camera, face: Face, verticesInFace: Vertex[]
	): void
	{
		var drawPos = this._drawPos;

		var faceAltitude = 0;

		this.graphics.beginPath();

		var faceVertexCount = face.vertexCount();
		for (var vi = 0; vi < faceVertexCount; vi++)
		{
			var vertex = verticesInFace[vi];
			faceAltitude += vertex.altitude;

			camera.convertWorldCoordsToViewCoords
			(
				drawPos.overwriteWith(vertex.pos)
			);

			if (vi == 0)
			{
				this.graphics.moveTo
				(
					drawPos.x, drawPos.y
				);
			}
			else
			{
				this.graphics.lineTo
				(
					drawPos.x, drawPos.y
				);
			}
		}

		this.graphics.closePath();

		faceAltitude /= face.vertexCount();

		var altitudeAtLowTide = .65;
		var altitudeAtHighTide = .67;
		var altitudeAtTreeLine = .95;

		var colorForFace;
		if (faceAltitude < altitudeAtLowTide)
		{
			colorForFace = "rgb(0, 0, 128)";
		}
		else if (faceAltitude < altitudeAtHighTide)
		{
			var colorComponent = Math.floor(255 * faceAltitude);
			colorForFace = 
				"rgb("
				+ colorComponent + ","
				+ colorComponent + ","
				+ Math.floor(colorComponent / 4)
				+ ")";
		}
		else if (faceAltitude < altitudeAtTreeLine)
		{
			var colorComponent = Math.floor(255 * faceAltitude);
			colorForFace = 
				"rgb(0, " + colorComponent + ", 0)";
		}
		else
		{
			var colorComponent = Math.floor(255 * faceAltitude);
			colorForFace = 
				"rgb("
				+ colorComponent + ","
				+ colorComponent + ","
				+ colorComponent + ")";
		}

		var isWireframe = false;
		if (isWireframe == false)
		{
			this.graphics.fillStyle = colorForFace;
			this.graphics.strokeStyle = colorForFace;
			this.graphics.fill();
		}
		this.graphics.stroke();
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