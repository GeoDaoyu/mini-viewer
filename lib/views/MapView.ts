import DOMContainer, { DOMContainerProperties } from "./DOMContainer";
import TileInfo from "../layers/support/TileInfo";
import Map from "../Map";
import type Layer from "../layers/Layer";
import LayerView from "./layers/LayerView";
import { reactiveUtils } from "@geodaoyu/accessor";

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
  private interacting: boolean = false;
  private lastClientX: number = 0;
  private lastClientY: number = 0;
  private interactionStartCenter: number[] = [0, 0];

  constructor(properties: MapViewProperties) {
    super(properties);
    this.zoom = properties.zoom || 0;
    this.center = properties.center || [0, 0];
    this.tileInfo = TileInfo.WebMercator;
    this.layerViews = [];

    this.map = properties.map;
    reactiveUtils.watch(
      () => this.map.layers,
      () => {
        this.createLayerView(this.map.layers);
        this.render();
      },
    );

    reactiveUtils.watch(
      () => [this.zoom, this.center],
      () => {
        this.render();
      },
    );
  }
  private createLayerView(layers: Layer[]) {
    this.layerViews = layers.map((layer) => layer.createLayerView(this));
  }
  private async render() {
    for (const layerView of this.layerViews) {
      await layerView.render();
    }
  }

  toMap(event: MouseEvent): [number, number] {
    const { canvas, tileInfo, zoom, center } = this;

    const currentLOD = tileInfo.lods.find((lod) => lod.level === zoom);
    if (!currentLOD) {
      throw new Error(`No LOD found for zoom level ${zoom}`);
    }

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const canvasCenterX = rect.width / 2;
    const canvasCenterY = rect.height / 2;

    const offsetX = mouseX - canvasCenterX;
    const offsetY = mouseY - canvasCenterY;

    const resolution = currentLOD.resolution;
    const [centerLng, centerLat] = center;

    const metersPerDegreeLat = 111320;
    const metersPerDegreeLng = 111320 * Math.cos((Math.PI / 180) * centerLat);

    const lng = centerLng + (offsetX * resolution) / metersPerDegreeLng;
    const lat = centerLat - (offsetY * resolution) / metersPerDegreeLat; // Y轴反向

    return [lng, lat];
  }
  protected handleWheel(event: WheelEvent): void {
    event.preventDefault();

    const delta = event.deltaY > 0 ? -1 : 1;
    this.zoom = Math.max(0, Math.min(23, this.zoom + delta));
  }
  protected handleDoubleClick(event: MouseEvent): void {
    event.preventDefault();
    const delta = 1;
    this.zoom = Math.max(0, Math.min(23, this.zoom + delta));
  }
  protected handleMouseDown(event: MouseEvent): void {
    if (event.button !== 0) return;

    this.interacting = true;
    this.lastClientX = event.clientX;
    this.lastClientY = event.clientY;
    this.interactionStartCenter = [...this.center];
    this.canvas.style.cursor = "grabbing";

    event.preventDefault();
  }
  protected handleMouseMove(): void {
    // debounce
  }
  protected handleMouseUp(event: MouseEvent): void {
    if (!this.interacting) return;

    this.interacting = false;
    this.canvas.style.cursor = "default";

    const mouseEndPoint = this.toMap(event);

    const startEvent = new MouseEvent("mousemove", {
      clientX: this.lastClientX,
      clientY: this.lastClientY,
    });
    const mouseStartPoint = this.toMap(startEvent);

    const deltaLng = mouseEndPoint[0] - mouseStartPoint[0];
    const deltaLat = mouseEndPoint[1] - mouseStartPoint[1];

    this.center = [
      this.interactionStartCenter[0] - deltaLng,
      this.interactionStartCenter[1] - deltaLat,
    ];
  }
}
