import Layer, { LayerProperties } from './Layer';
import Graphic from '@/Graphic';
import MapView from '@/views/MapView';
import GraphicsLayerView from '@/views/layers/GraphicsLayerView';

export interface GraphicsLayerProperties extends LayerProperties {
  graphics?: Graphic[];
}

export default class GraphicsLayer extends Layer {
  graphics: Graphic[];

  constructor(properties: GraphicsLayerProperties) {
    super(properties);
    this.graphics = properties.graphics || [];
  }

  createLayerView(view: MapView): GraphicsLayerView {
    return new GraphicsLayerView({ view, layer: this });
  }
}
