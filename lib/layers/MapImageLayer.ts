import Layer, { LayerProperties } from "./Layer";

export interface MapImageLayerProperties extends LayerProperties {}

export default class MapImageLayer extends Layer {
  constructor(properties: MapImageLayerProperties) {
    super(properties);
  }
  getExportImageUrl(
    bbox: [number, number, number, number],
    width: number,
    height: number,
  ): string {
    const [xmin, ymin, xmax, ymax] = bbox;
    return `${this.url}/export?f=image&bbox=${xmin},${ymin},${xmax},${ymax}&bboxSR=4326&imageSR=4326&size=${width},${height}&transparent=true`;
  }
}
