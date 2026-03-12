import Layer, { LayerProperties, LayerType } from "./Layer";
import MapView from "@/views/MapView";
import WebTileLayerView from "@/views/layers/WebTileLayerView";

/**
 * 与ArcGIS JS API 不一致，
 * 这里设计WebTileLayer作为基类
 * TileLayer和OpenStreetMapLayer继承自WebTileLayer
 */
export interface WebTileLayerProperties extends LayerProperties {
  url: string;
}

export default class WebTileLayer extends Layer {
  readonly type: LayerType = "web-tile";
  url: string;

  constructor(properties: WebTileLayerProperties) {
    super(properties);
    this.url = properties.url;
  }

  createLayerView(view: MapView): WebTileLayerView {
    return new WebTileLayerView({ view, layer: this });
  }
}
