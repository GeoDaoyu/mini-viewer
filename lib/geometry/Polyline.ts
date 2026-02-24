export interface PolylineProperties {
  paths: number[][][];
}

export default class Polyline {
  public paths: number[][][];
  public readonly type: string;

  constructor(properties: PolylineProperties) {
    this.type = "polyline";
    this.paths = properties.paths;
  }
}
