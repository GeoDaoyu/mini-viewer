import { lngLatToXY } from "./support/webMercatorUtils";

export interface PointProperties {
  latitude: number;
  longitude: number;
}

export default class Point {
  public latitude: number;
  public longitude: number;
  public x: number;
  public y: number;
  public readonly type: string;

  constructor(pointProperties: PointProperties) {
    this.type = "point";
    this.latitude = pointProperties.latitude;
    this.longitude = pointProperties.longitude;
    const [x, y] = lngLatToXY(this.longitude, this.latitude);
    this.x = x;
    this.y = y;
  }

  // TODO: missing methods
  // clone() {}
  // copy() {}
  // distance() {}
  // equals() {}
}
