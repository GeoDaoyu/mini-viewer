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
  zoom?: number;
  center?: number[];
  tileInfo: TileInfo;
  map: Map;
  layerViews: LayerView[];

  constructor(properties: MapViewProperties) {
    super(properties);
    this.zoom = properties.zoom || 4;
    this.center = properties.center || [0, 0];
    this.tileInfo = TileInfo.WebMercator;
    this.layerViews = [];

    this.map = this.observableMap(properties.map);
  }
  observableMap(map: Map) {
    return new Proxy(map, {
      set: (target, property, value, receiver) => {
        const result = Reflect.set(target, property, value, receiver);
        if (property === "layers") {
          this.createLayerView(value);
        }
        return result;
      },
    });
  }
  createLayerView(layers: Layer[]) {
    this.layerViews = layers.map((layer) => layer.createLayerView(this));
    this.layerViews.forEach((lv) => lv.render());
  }
}
