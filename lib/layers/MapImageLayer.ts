import Layer, { LayerProperties } from "./Layer";
import MapView from "@/views/MapView";
import MapImageLayerView from "@/views/layers/MapImageLayerView";

export interface MapImageLayerProperties extends LayerProperties {
  url: string;
}

export default class MapImageLayer extends Layer {
  url: string;

  constructor(properties: MapImageLayerProperties) {
    super(properties);
    this.url = properties.url;
  }
  createLayerView(view: MapView): MapImageLayerView {
    return new MapImageLayerView({ view, layer: this });
  }
}
