import LayerView from "./LayerView";
import { lngLatToXY } from "../../geometry/support/webMercatorUtils";

export default class MapImageLayerView extends LayerView {
  async render() {
    try {
      const bbox = this.getBBox();
      const [xmin, ymin, xmax, ymax] = bbox;
      const layer = this.layer;
      const { canvas } = this.view;
      const width = canvas.width;
      const height = canvas.height;

      const url = `${layer.url}/export?format=png&f=image&bbox=${xmin},${ymin},${xmax},${ymax}&size=${width},${height}&transparent=true`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const imgUrl = URL.createObjectURL(blob);

      const img = new Image();
      img.onload = () => {
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          throw new Error("No canvas context");
        }
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(imgUrl);
      };

      img.onerror = (error) => {
        console.error("Error loading image:", error);
        URL.revokeObjectURL(imgUrl);
      };

      img.src = imgUrl;
    } catch (error) {
      console.error("Error in render method:", error);
    }
  }
  getBBox(): [number, number, number, number] {
    const { tileInfo, zoom, canvas, center } = this.view;
    const currentLOD = tileInfo.lods.find((lod) => lod.level === zoom);
    if (!currentLOD) {
      throw new Error(`No LOD found for zoom level ${zoom}`);
    }

    const resolution = currentLOD.resolution;
    const width = canvas.width;
    const height = canvas.height;

    const halfWidthMapUnits = (width * resolution) / 2;
    const halfHeightMapUnits = (height * resolution) / 2;

    const [centerX, centerY] = lngLatToXY(center![0], center![1]);

    const xmin = centerX - halfWidthMapUnits;
    const xmax = centerX + halfWidthMapUnits;
    const ymin = centerY - halfHeightMapUnits;
    const ymax = centerY + halfHeightMapUnits;

    return [xmin, ymin, xmax, ymax];
  }
}
