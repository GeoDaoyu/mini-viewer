import GraphicsLayer from "@/layers/GraphicsLayer";
import Graphic from "@/Graphic";
import Point from "@/geometry/Point";
import Polyline from "@/geometry/Polyline";
import Polygon from "@/geometry/Polygon";

const pointGeometry = new Point({ longitude: 120, latitude: 30 });
const pointGraphic = new Graphic({
  geometry: pointGeometry,
});

const lineGeometry = new Polyline({
  paths: [
    [
      [120, 30],
      [121, 31],
      [122, 30],
    ],
  ],
});
const lineGraphic = new Graphic({
  geometry: lineGeometry,
});

const polygonGeometry = new Polygon({
  rings: [
    [
      [119, 29],
      [121, 29],
      [121, 31],
      [119, 31],
      [119, 29],
    ],
  ],
});
const polygonGraphic = new Graphic({
  geometry: polygonGeometry,
});

const graphicsLayer = new GraphicsLayer({
  id: "Graphics",
  graphics: [pointGraphic, lineGraphic, polygonGraphic],
});

export default graphicsLayer;
