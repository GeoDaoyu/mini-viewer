import DOMContainer, { DOMContainerProperties } from "./DOMContainer";
import TileInfo from "../layers/support/TileInfo";
import Map from "../Map";
import type Layer from "../layers/Layer";
import LayerView from "./layers/LayerView";

interface MapViewProperties extends DOMContainerProperties {
  zoom?: number;
  center?: number[];
  map: Map;
}

export default class MapView extends DOMContainer {
  zoom: number; // 0 - 23
  center: number[];
  tileInfo: TileInfo;
  map: Map;
  layerViews: LayerView[];

  constructor(properties: MapViewProperties) {
    super(properties);
    this.zoom = properties.zoom || 0;
    this.center = properties.center || [0, 0];
    this.tileInfo = TileInfo.WebMercator;
    this.layerViews = [];

    this.map = this.observableMap(properties.map);
  }
  private observableMap(map: Map) {
    return new Proxy(map, {
      set: (target, property, value, receiver) => {
        const result = Reflect.set(target, property, value, receiver);
        if (property === "layers") {
          this.createLayerView(value);
          this.render();
        }
        return result;
      },
    });
  }
  private createLayerView(layers: Layer[]) {
    this.layerViews = layers.map((layer) => layer.createLayerView(this));
  }
  private render() {
    this.layerViews.forEach((lv) => lv.render());
  }
  protected handleWheel(event: WheelEvent): void {
    event.preventDefault();

    const delta = event.deltaY > 0 ? -1 : 1;
    this.zoom = Math.max(0, Math.min(23, this.zoom + delta));
    // TODO: watch()
    this.render();
  }
}
