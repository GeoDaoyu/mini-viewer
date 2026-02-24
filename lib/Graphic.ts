import type Layer from "./layers/Layer";
import type Point from "./geometry/Point";

export interface GraphicProperties {
  attributes?: Record<string, any>;
  geometry: Point;
  layer?: Layer;
  symbol?: any;
}

export default class Graphic {
  public attributes: Record<string, any>;
  public geometry: Point;
  public layer?: Layer;
  public symbol: any;

  constructor(properties: GraphicProperties) {
    this.attributes = properties.attributes || {};
    this.geometry = properties.geometry;
    this.layer = properties.layer;
    this.symbol = properties.symbol;
  }

  getAttribute(name: string): any {
    return this.attributes[name];
  }
  setAttribute(name: string, newValue: any): void {
    this.attributes[name] = newValue;
  }
}
