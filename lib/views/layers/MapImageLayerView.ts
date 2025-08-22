import LayerView from "./LayerView";

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
          throw new Error("Could not get canvas context");
        }

        // 保存当前Canvas状态（用于增量绘制）
        const imageData = ctx.getImageData(0, 0, width, height);

        // 清除Canvas（可选，取决于你是否需要叠加效果）
        // ctx.clearRect(0, 0, width, height);

        // 绘制新图片（增量绘制）
        ctx.drawImage(img, 0, 0, width, height);

        // 如果你需要叠加效果，可以在这里处理imageData
        // 例如：ctx.putImageData(imageData, 0, 0);

        // 释放URL对象
        URL.revokeObjectURL(imgUrl);

        console.log("Image rendered successfully");
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
    return [
      1.2385929901839022e7, 9318937.485669367, 7.065878105906263e7,
      4.635876595402607e7,
    ];
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

    const [centerX, centerY] = center as number[];
    const xmin = centerX - halfWidthMapUnits;
    const xmax = centerX + halfWidthMapUnits;
    const ymin = centerY - halfHeightMapUnits;
    const ymax = centerY + halfHeightMapUnits;

    return [xmin, ymin, xmax, ymax];
  }
}
