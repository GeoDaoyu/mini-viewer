import Layer, { LayerProperties } from './Layer';
import Graphic from '@/Graphic';
import { Renderer } from '@/renderers/Renderer';
import MapView from '@/views/MapView';
import GraphicsLayerView from '@/views/layers/GraphicsLayerView';

export interface GraphicsLayerProperties extends LayerProperties {
  graphics?: Graphic[];
  renderer?: Renderer;
}

export default class GraphicsLayer extends Layer {
  graphics: Graphic[];
  renderer?: Renderer;

  constructor(properties: GraphicsLayerProperties) {
    super(properties);
    this.graphics = properties.graphics || [];
    this.renderer = properties.renderer;
  }

  createLayerView(view: MapView): GraphicsLayerView {
    return new GraphicsLayerView({ view, layer: this });
  }
}
