import DOMContainer, { DOMContainerProperties } from "./DOMContainer";
import TileInfo from "../layers/support/TileInfo";
import Map from "../Map";

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

  constructor(properties: MapViewProperties) {
    super(properties);
    this.zoom = properties.zoom || 10;
    this.center = properties.center || [0, 0];
    this.tileInfo = TileInfo.WebMercator;
    this.map = properties.map;
  }
}
