export interface PolygonProperties {
  rings: number[][][];
}

export default class Polygon {
  public rings: number[][][];
  public readonly type: string;

  constructor(properties: PolygonProperties) {
    this.type = "polygon";
    this.rings = properties.rings;
  }
}
