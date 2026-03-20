import FeatureLayer from "@/layers/FeatureLayer";
import Graphic from "@/Graphic";
import Polygon from "@/geometry/Polygon";
import { SimpleFillSymbol } from "@/symbols/SimpleFillSymbol";
import { SimpleLineSymbol } from "@/symbols/SimpleLineSymbol";
import { Color } from "@/Color";

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
const featureFillSymbol = new SimpleFillSymbol(
  new Color([255, 165, 0, 0.6]),
  "solid",
  new SimpleLineSymbol(new Color([255, 140, 0, 1]), 2),
);
const featureGraphic1 = new Graphic({
  geometry: polygon1,
  symbol: featureFillSymbol,
});
const featureGraphic2 = new Graphic({
  geometry: polygon2,
  symbol: featureFillSymbol,
});

const sourceFeatureLayer = new FeatureLayer({
  id: "Feature Layer(source)",
  title: "Feature Layer(source)",
  source: [featureGraphic1, featureGraphic2],
});

const urlFeatureLayer = new FeatureLayer({
  id: "Feature Layer",
  title: "Feature Layer",
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/128peaks/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&f=pjson",
});

export const sourceCode = `import FeatureLayer from "@/layers/FeatureLayer";
import Graphic from "@/Graphic";
import Polygon from "@/geometry/Polygon";
import { SimpleFillSymbol } from "@/symbols/SimpleFillSymbol";
import { SimpleLineSymbol } from "@/symbols/SimpleLineSymbol";
import { Color } from "@/Color";

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
const featureFillSymbol = new SimpleFillSymbol(
  new Color([255, 165, 0, 0.6]),
  "solid",
  new SimpleLineSymbol(new Color([255, 140, 0, 1]), 2),
);
const featureGraphic1 = new Graphic({
  geometry: polygon1,
  symbol: featureFillSymbol,
});
const featureGraphic2 = new Graphic({
  geometry: polygon2,
  symbol: featureFillSymbol,
});

const sourceFeatureLayer = new FeatureLayer({
  id: "Feature Layer(source)",
  title: "Feature Layer(source)",
  source: [featureGraphic1, featureGraphic2],
});

export default sourceFeatureLayer;`;

export const urlCode = `import FeatureLayer from "@/layers/FeatureLayer";

const urlFeatureLayer = new FeatureLayer({
  id: "Feature Layer",
  title: "Feature Layer",
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/128peaks/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&f=pjson",
});

export default urlFeatureLayer;`;

export { sourceFeatureLayer, urlFeatureLayer };
