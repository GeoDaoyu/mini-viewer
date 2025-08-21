import Layer, { LayerProperties } from "./Layer";

export interface MapImageLayerProperties extends LayerProperties {}

export default class MapImageLayer extends Layer {
  constructor(properties: MapImageLayerProperties) {
    super(properties);
  }
}
