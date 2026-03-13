import WebTileLayer, { WebTileLayerProperties } from "./WebTileLayer";
import { LayerType } from "./Layer";
import MapView from "@/views/MapView";
import TileLayerView from "@/views/layers/TileLayerView";

export interface TileLayerProperties extends WebTileLayerProperties {}

export default class TileLayer extends WebTileLayer {
  readonly type: LayerType = "tile";

  constructor(properties: TileLayerProperties) {
    super({
      ...properties,
      url: properties.url,
      id: properties.id,
    });
  }

  createLayerView(view: MapView): TileLayerView {
    return new TileLayerView({ view, layer: this });
  }
}
