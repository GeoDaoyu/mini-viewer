import WebTileLayer, { WebTileLayerProperties } from "./WebTileLayer";
import { LayerType } from "./Layer";
import MapView from "@/views/MapView";
import OpenStreetMapLayerView from "@/views/layers/OpenStreetMapLayerView";

const URL = `https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=6ZGpPKRz8wRa8nV56Gwt`;

export interface OpenStreetMapLayerProperties extends Partial<Omit<WebTileLayerProperties, "url">> {
  url?: string;
}

export default class OpenStreetMapLayer extends WebTileLayer {
  readonly type: LayerType = "open-street-map";

  constructor(properties: OpenStreetMapLayerProperties = {}) {
    super({ ...properties, url: properties.url || URL, id: properties.id || "osm-layer" });
  }

  createLayerView(view: MapView): OpenStreetMapLayerView {
    return new OpenStreetMapLayerView({ view, layer: this });
  }
}
