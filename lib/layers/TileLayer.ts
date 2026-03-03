import Layer, { LayerProperties, LayerType } from "./Layer";
import MapView from "@/views/MapView";
import TileLayerView from "@/views/layers/TileLayerView";

export interface TileLayerProperties extends LayerProperties {
  url: string;
}

export default class TileLayer extends Layer {
  readonly type: LayerType = "tile";
  url: string;

  constructor(properties: TileLayerProperties) {
    super(properties);
    this.url = properties.url;
  }
  createLayerView(view: MapView): TileLayerView {
    return new TileLayerView({ view, layer: this });
  }
}
