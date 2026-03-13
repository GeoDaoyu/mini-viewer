import WebTileLayer, { WebTileLayerProperties } from "./WebTileLayer";
import { LayerType } from "./Layer";
import MapView from "@/views/MapView";
import OpenStreetMapLayerView from "@/views/layers/OpenStreetMapLayerView";

export interface OpenStreetMapLayerProperties extends WebTileLayerProperties {}

export default class OpenStreetMapLayer extends WebTileLayer {
  readonly type: LayerType = "open-street-map";

  constructor(properties: OpenStreetMapLayerProperties) {
    super({
      ...properties,
      url: properties.url,
      id: properties.id,
    });
  }

  createLayerView(view: MapView): OpenStreetMapLayerView {
    return new OpenStreetMapLayerView({ view, layer: this });
  }
}
