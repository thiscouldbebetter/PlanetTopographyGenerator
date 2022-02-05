"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var PlanetTopographyGenerator;
    (function (PlanetTopographyGenerator) {
        class Terrain {
            constructor(name, altitudeMin, altitudeMax, colorMinAsRgb, colorMaxAsRgb) {
                this.name = name;
                this.altitudeMin = altitudeMin;
                this.altitudeMax = altitudeMax;
                this.colorMinAsRgb = colorMinAsRgb;
                this.colorMaxAsRgb = colorMaxAsRgb;
                this.altitudeRange = this.altitudeMax - this.altitudeMin;
            }
            colorAtAltitude(altitude) {
                var returnColor = null;
                if (altitude <= this.altitudeMin) {
                    returnColor = this.colorMinAsRgb;
                }
                else if (altitude >= this.altitudeMax) {
                    returnColor = this.colorMaxAsRgb;
                }
                else {
                    var fraction = (altitude - this.altitudeMin) / this.altitudeRange;
                    var fractionReversed = 1 - fraction;
                    returnColor =
                        [
                            this.colorMaxAsRgb[0] * fraction + this.colorMinAsRgb[0] * fractionReversed,
                            this.colorMaxAsRgb[1] * fraction + this.colorMinAsRgb[1] * fractionReversed,
                            this.colorMaxAsRgb[2] * fraction + this.colorMinAsRgb[2] * fractionReversed,
                        ];
                }
                var returnColorAsString = "rgb(" + returnColor.join(",") + ")";
                return returnColorAsString;
            }
            // Strings.
            static fromString(terrainAsString) {
                var parts = terrainAsString.split(":").map(x => x.trim());
                var name = parts[0];
                var altitudeMax = parseFloat(parts[1]);
                var colorRangeAsString = parts[2];
                var colorsMinAndMaxAsStrings = colorRangeAsString.split("-").map(x => x.trim());
                var colorsMinAndMax = colorsMinAndMaxAsStrings.map(x => x.split(",").map(y => y.trim()).map(z => parseInt(z)));
                var returnTerrain = new Terrain(name, null, altitudeMax, colorsMinAndMax[0], colorsMinAndMax[1]);
                return returnTerrain;
            }
            toString() {
                var returnString = this.name + ": "
                    + this.altitudeMax + ": "
                    + this.colorMinAsRgb.join(",")
                    + " - "
                    + this.colorMaxAsRgb.join(",");
                return returnString;
            }
        }
        PlanetTopographyGenerator.Terrain = Terrain;
        class TerrainGroup {
            constructor(name, terrains) {
                this.name = name;
                this.terrains = terrains;
                var terrainPrev = this.terrains[0];
                terrainPrev.altitudeMin = 0;
                for (var i = 1; i < this.terrains.length; i++) {
                    var terrain = this.terrains[i];
                    terrain.altitudeMin = terrainPrev.altitudeMax;
                }
            }
            static Instances() {
                if (TerrainGroup._instances == null) {
                    TerrainGroup._instances = new TerrainGroup_Instances();
                }
                return TerrainGroup._instances;
            }
            colorAtAltitude(altitude) {
                var terrain = this.terrainAtAltitude(altitude);
                var color = terrain.colorAtAltitude(altitude);
                return color;
            }
            terrainAtAltitude(altitude) {
                var returnTerrain = null;
                // hack
                if (altitude < 0) {
                    altitude = 0;
                }
                else if (altitude > 1) {
                    altitude = 1;
                }
                for (var i = 0; i < this.terrains.length; i++) {
                    var terrain = this.terrains[i];
                    if (altitude >= terrain.altitudeMin
                        &&
                            (altitude <= terrain.altitudeMax)) {
                        returnTerrain = terrain;
                        break;
                    }
                }
                return returnTerrain;
            }
            // Strings.
            static fromString(terrainGroupAsString) {
                var lines = terrainGroupAsString.split("\n");
                var name = lines[0];
                var terrainsAsStrings = lines.slice(1);
                var terrains = terrainsAsStrings.map(x => Terrain.fromString(x));
                var returnValue = new TerrainGroup(name, terrains);
                return returnValue;
            }
            toString() {
                var lines = [
                    this.name
                ];
                var terrainsAsStrings = this.terrains.map(x => x.toString());
                lines.push(...terrainsAsStrings);
                var returnString = lines.join("\n");
                return returnString;
            }
        }
        PlanetTopographyGenerator.TerrainGroup = TerrainGroup;
        class TerrainGroup_Instances {
            constructor() {
                this.Earthlike = new TerrainGroup("Earthlike", [
                    new Terrain("Ocean", null, 0.65, [0, 0, 128], [0, 0, 128]),
                    new Terrain("Beach", null, 0.67, [192, 192, 32], [192, 255, 32]),
                    new Terrain("Greenery", null, 0.95, [0, 128, 0], [0, 255, 0]),
                    new Terrain("Snow", null, 1, [255, 255, 255], [255, 255, 255]) // hack - max alt should be 1.
                ]);
                this._All =
                    [
                        this.Earthlike
                    ];
                this._AllByName = new Map(this._All.map(x => [x.name, x]));
            }
            byName(name) {
                return this._AllByName.get(name);
            }
        }
        PlanetTopographyGenerator.TerrainGroup_Instances = TerrainGroup_Instances;
    })(PlanetTopographyGenerator = ThisCouldBeBetter.PlanetTopographyGenerator || (ThisCouldBeBetter.PlanetTopographyGenerator = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
