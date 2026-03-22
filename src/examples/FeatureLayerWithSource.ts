import FeatureLayer from "@/layers/FeatureLayer";
import Graphic from "@/Graphic";
import Polygon from "@/geometry/Polygon";

const polygon1 = new Polygon({
  rings: [
    [
      [115, 25],
      [125, 25],
      [125, 35],
      [125, 35],
      [115, 35],
      [115, 25],
    ],
  ],
});
const polygon2 = new Polygon({
  rings: [
    [
      [100, 20],
      [110, 20],
      [110, 30],
      [100, 30],
      [100, 20],
    ],
  ],
});
const featureGraphic1 = new Graphic({
  geometry: polygon1,
});
const featureGraphic2 = new Graphic({
  geometry: polygon2,
});

const featureLayer = new FeatureLayer({
  id: "FeatureLayerWithSource",
  source: [featureGraphic1, featureGraphic2],
});

export default featureLayer;
