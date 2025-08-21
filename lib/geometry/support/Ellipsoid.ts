export class Ellipsoid {
  semiMajorAxis: number;
  flattening: number;
  outerAtmosphereRimWidth: number;
  atmosphereHeight: number;
  scaleHeight: number;
  semiMinorAxis: number;
  halfSemiMajorAxis: number;
  halfCircumference: number;
  metersPerDegree: number;
  inverseFlattening: number;
  eccentricitySquared: number;
  meanRadiusSemiAxes: number;

  constructor(
    semiMajorAxis: number,
    flattening: number,
    outerAtmosphereRimWidth: number,
    atmosphereHeight: number,
    scaleHeight: number,
    eccentricitySquared?: number,
  ) {
    this.semiMajorAxis = semiMajorAxis;
    this.flattening = flattening;
    this.outerAtmosphereRimWidth = outerAtmosphereRimWidth;
    this.atmosphereHeight = atmosphereHeight;
    this.scaleHeight = scaleHeight;

    const r = 1 - this.flattening;
    this.semiMinorAxis = this.semiMajorAxis * r;
    this.halfSemiMajorAxis = this.semiMajorAxis / 2;
    this.halfCircumference = Math.PI * this.semiMajorAxis;
    this.metersPerDegree = this.halfCircumference / 180;
    this.inverseFlattening = 1 / (1 - this.flattening) - 1;
    this.eccentricitySquared =
      eccentricitySquared ||
      2 * this.flattening - this.flattening * this.flattening;
    this.meanRadiusSemiAxes = (2 * this.semiMajorAxis + this.semiMinorAxis) / 3;
  }

  get radius(): number {
    return this.semiMajorAxis;
  }
}

export const earth = new Ellipsoid(
  6378137,
  1 / 298.257223563,
  3e5,
  1e5,
  0.085,
  0.006694379990137799,
);
