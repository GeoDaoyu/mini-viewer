import Layer, { LayerProperties, LayerType } from "./Layer";
import MapView from "@/views/MapView";
import OSMTileLayerView from "@/views/layers/OSMTileLayerView";

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
  createLayerView(view: MapView): OSMTileLayerView {
    return new OSMTileLayerView({ view, layer: this });
  }
}
