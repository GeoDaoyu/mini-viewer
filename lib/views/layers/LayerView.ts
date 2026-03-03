import MapView from "../MapView";
import Layer from "../../layers/Layer";

export interface LayerViewProperties<T extends Layer = Layer> {
  layer: T;
  view: MapView;
}

export default class LayerView<T extends Layer = Layer> {
  layer: T;
  view: MapView;
  constructor(properties: LayerViewProperties<T>) {
    this.layer = properties.layer;
    this.view = properties.view;
  }
  async render() {}
}
