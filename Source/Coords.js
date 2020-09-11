
class Coords
{
	constructor(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
	}

	add(other)
	{
		this.x += other.x;
		this.y += other.y;
		this.z += other.z;

		return this;
	}

	clone()
	{
		return new Coords(this.x, this.y, this.z);
	}

	crossProduct(other)
	{
		return this.overwriteWithXYZ
		(
			this.y * other.z - this.z * other.y,
			this.z * other.x - this.x * other.z,
			this.x * other.y - this.y * other.x
		);
	}

	divideScalar(scalar)
	{
		this.x /= scalar;
		this.y /= scalar;
		this.z /= scalar;

		return this;
	}

	dotProduct(other)
	{
		return this.x * other.x + this.y * other.y + this.z * other.z;
	}

	half()
	{
		return this.divideScalar(2);
	}

	magnitude()
	{
		return Math.sqrt
		(
			this.x * this.x
			+ this.y * this.y
			+ this.z * this.z
		);
	}

	multiply(other)
	{
		this.x *= other.x;
		this.y *= other.y;
		this.z *= other.z;

		return this;
	}

	multiplyScalar(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;

		return this;
	}

	normalize()
	{
		return this.divideScalar(this.magnitude());
	}

	overwriteWith(other)
	{
		this.x = other.x;
		this.y = other.y;
		this.z = other.z;

		return this;
	}

	overwriteWithXYZ(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;

		return this;
	}

	subtract(other)
	{
		this.x -= other.x;
		this.y -= other.y;
		this.z -= other.z;

		return this;
	}
}
