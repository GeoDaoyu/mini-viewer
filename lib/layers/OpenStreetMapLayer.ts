import Layer, { LayerProperties, LayerType } from "./Layer";
import MapView from "@/views/MapView";
import OpenStreetMapLayerView from "@/views/layers/OpenStreetMapLayerView";

const URL = `https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=6ZGpPKRz8wRa8nV56Gwt`;

export interface OpenStreetMapLayerProperties extends LayerProperties {
  url?: string;
}

export default class OpenStreetMapLayer extends Layer {
  readonly type: LayerType = "open-street-map";
  url: string;

  constructor(properties: OpenStreetMapLayerProperties) {
    super(properties);
    this.url = properties.url || URL;
  }
  createLayerView(view: MapView): OpenStreetMapLayerView {
    return new OpenStreetMapLayerView({ view, layer: this });
  }
}
