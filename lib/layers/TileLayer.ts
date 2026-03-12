import WebTileLayer, { WebTileLayerProperties } from "./WebTileLayer";
import { LayerType } from "./Layer";
import MapView from "@/views/MapView";
import TileLayerView from "@/views/layers/TileLayerView";

const URL = `https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`;

export interface TileLayerProperties extends Partial<Omit<WebTileLayerProperties, "url">> {
  url?: string;
}

export default class TileLayer extends WebTileLayer {
  readonly type: LayerType = "tile";

  constructor(properties: TileLayerProperties = {}) {
    super({ ...properties, url: properties.url || URL, id: properties.id || "tile-layer" });
  }

  createLayerView(view: MapView): TileLayerView {
    return new TileLayerView({ view, layer: this });
  }
}
