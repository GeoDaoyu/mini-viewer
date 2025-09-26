import type Layer from "./layers/Layer";
import type Point from "./geometry/Point";

export interface GraphicProperties {
  attributes?: Object;
  geometry: Point;
  layer?: Layer;
  symbol?: any;
  visible?: boolean;
}

export default class Graphic {
  public attributes: Object;
  public geometry: Point;
  public layer: Layer;
  public symbol: any;
  public visible: boolean;

  constructor(properties: GraphicProperties) {
    this.attributes = properties.attributes || {};
    this.geometry = properties.geometry;
  }

  getAttribute(name: string): any {
    return this.attributes[name];
  }
  setAttribute(name: string, newValue: any): void {
    this.attributes[name] = newValue;
  }

  // TODO: missing method
  // clone() {}
  // fromJSON() {}
  // toJSON() {}
}
