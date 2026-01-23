import Layer from "./layers/Layer";
import { Accessor } from "@geodaoyu/accessor";

export interface MapProperties {
  layers?: Layer[];
}

export default class Map extends Accessor {
  public layers: Layer[];

  constructor(properties: MapProperties = {}) {
    super();
    this.layers = properties.layers || [];
  }

  add(layer: Layer): void {
    this.layers = [...this.layers, layer];
  }

  remove(layer: Layer): Layer {
    this.layers = this.layers.filter((l) => l.id !== layer.id);
    return layer;
  }

  findLayerById(id: string): Layer | undefined {
    return this.layers.find((layer) => layer.id === id);
  }

  removeAll(): void {
    this.layers = [];
  }
}
