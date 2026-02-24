import Layer, { LayerProperties } from './Layer';
import Graphic from '../Graphic';
import { Renderer } from '../renderers/Renderer';
import MapView from '../views/MapView';
import GeoJSONLayerView from '../views/layers/GeoJSONLayerView';

export interface GeoJSONLayerProperties extends LayerProperties {
  source?: Graphic[];
  renderer?: Renderer;
}

export default class GeoJSONLayer extends Layer {
  source: Graphic[];
  renderer?: Renderer;

  constructor(properties: GeoJSONLayerProperties) {
    super(properties);
    this.source = properties.source || [];
    this.renderer = properties.renderer;
  }

  createLayerView(view: MapView): GeoJSONLayerView {
    return new GeoJSONLayerView({ view, layer: this });
  }
}
