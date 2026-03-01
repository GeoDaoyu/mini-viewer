import MapView from "@/views/MapView";
import LayerView from "@/views/layers/LayerView";

export interface LayerProperties {
  id: string;
  title?: string;
}

export default class Layer {
  id: string;
  title?: string;

  constructor(properties: LayerProperties) {
    this.id = properties.id;
    this.title = properties.title;
  }
  createLayerView(view: MapView): LayerView {
    return new LayerView({ view, layer: this });
  }
}
