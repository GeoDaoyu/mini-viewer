import MapView from "../MapView";
import Layer from "../../layers/Layer";

export interface LayerViewProperties {
  layer: Layer;
  view: MapView;
}

export default class LayerView {
  layer: Layer;
  view: MapView;
  constructor(properties: LayerViewProperties) {
    this.layer = properties.layer;
    this.view = properties.view;
  }
  render() {}
}
