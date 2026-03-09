import Layer, { LayerProperties, LayerType } from './Layer';
import Graphic from '@/Graphic';
import MapView from '@/views/MapView';
import FeatureLayerView from '@/views/layers/FeatureLayerView';
import { Renderer } from '@/renderers/Renderer';

export interface FeatureLayerProperties extends LayerProperties {
  source?: Graphic[];
  renderer?: Renderer;
}

export default class FeatureLayer extends Layer {
  readonly type: LayerType = "feature";
  source: Graphic[];
  renderer?: Renderer;

  constructor(properties: FeatureLayerProperties) {
    super(properties);
    this.source = properties.source || [];
    this.renderer = properties.renderer;
  }

  createLayerView(view: MapView): FeatureLayerView {
    return new FeatureLayerView({ view, layer: this });
  }
}
