import Layer, { LayerProperties } from "./Layer";
import MapView from "../views/MapView";
import TileLayerView from "../views/layers/TileLayerView";

export interface TileLayerProperties extends LayerProperties {}

export default class MapImageLayer extends Layer {
  constructor(properties: TileLayerProperties) {
    super(properties);
  }
  createLayerView(view: MapView): TileLayerView {
    return new TileLayerView({ view, layer: this });
  }
}
