import Layer, { LayerProperties, LayerType } from "./Layer";
import MapView from "@/views/MapView";
import OpenStreetMapLayerView from "@/views/layers/OpenStreetMapLayerView";

const URL = `https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`;

export interface TileLayerProperties extends LayerProperties {
  url?: string;
}

export default class OpenStreetMapLayer extends Layer {
  readonly type: LayerType = "tile";
  url: string;

  constructor(properties: TileLayerProperties) {
    super(properties);
    this.url = properties.url || URL;
  }
  createLayerView(view: MapView): OpenStreetMapLayerView {
    return new OpenStreetMapLayerView({ view, layer: this });
  }
}
