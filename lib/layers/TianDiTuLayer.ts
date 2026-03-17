import WebTileLayer, { WebTileLayerProperties } from "./WebTileLayer";
import { LayerType } from "./Layer";
import MapView from "@/views/MapView";
import TianDiTuLayerView from "@/views/layers/TianDiTuLayerView";

export interface TianDiTuLayerProperties extends WebTileLayerProperties {}

export default class TianDiTuLayer extends WebTileLayer {
  readonly type: LayerType = "tian-di-tu";

  constructor(properties: TianDiTuLayerProperties) {
    super({
      ...properties,
      url: properties.url,
      id: properties.id,
    });
  }

  createLayerView(view: MapView): TianDiTuLayerView {
    return new TianDiTuLayerView({ view, layer: this });
  }
}
