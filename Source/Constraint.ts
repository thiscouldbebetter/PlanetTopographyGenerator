
namespace ThisCouldBeBetter.PlanetTopographyGenerator
{

export interface Constraint
{
	applyToBody(body: Constrainable): void;
	name: string;
}

}