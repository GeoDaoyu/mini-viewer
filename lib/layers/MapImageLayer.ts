import Layer, { LayerProperties } from "./Layer";
import MapView from "@/views/MapView";
import MapImageLayerView from "@/views/layers/MapImageLayerView";

export interface MapImageLayerProperties extends LayerProperties {}

export default class MapImageLayer extends Layer {
  constructor(properties: MapImageLayerProperties) {
    super(properties);
  }
  createLayerView(view: MapView): MapImageLayerView {
    return new MapImageLayerView({ view, layer: this });
  }
}
