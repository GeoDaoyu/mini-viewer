import Layer, { LayerProperties, LayerType } from "./Layer";
import MapView from "@/views/MapView";
import TileLayerView from "@/views/layers/TileLayerView";

export interface OSMTileLayerProperties extends LayerProperties {
  url: string;
}

export default class OSMTileLayer extends Layer {
  readonly type: LayerType = "tile";
  url: string;

  constructor(properties: OSMTileLayerProperties) {
    super(properties);
    this.url = properties.url;
  }
  createLayerView(view: MapView): TileLayerView {
    return new TileLayerView({ view, layer: this });
  }
}
