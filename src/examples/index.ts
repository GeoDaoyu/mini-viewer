import tileLayer from "./TileLayer";
import openStreetMapLayer from "./OpenStreetMapLayer";
import tianDiTuLayer from "./TianDiTuLayer";
import graphicsLayer from "./GraphicsLayer";
import mapImageLayer from "./MapImageLayer";
import { sourceFeatureLayer, urlFeatureLayer } from "./FeatureLayer";
import geojsonLayer from "./GeoJSONLayer";

export interface LayerExample {
  code: string;
  layer: any;
}

export const layerExamples: Record<string, LayerExample> = {
  Tile: {
    code: `import TileLayer from "@/layers/TileLayer";

const tileLayer = new TileLayer({
  id: "Tile",
  title: "Tile",
  url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
});

export default tileLayer;`,
    layer: tileLayer,
  },
  "OSM Tile": {
    code: `import OpenStreetMapLayer from "@/layers/OpenStreetMapLayer";

const openStreetMapLayer = new OpenStreetMapLayer({
  id: "OSM Tile",
  title: "OSM Tile",
  url: "https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=6ZGpPKRz8wRa8nV56Gwt",
});

export default openStreetMapLayer;`,
    layer: openStreetMapLayer,
  },
  TianDiTu: {
    code: `import TianDiTuLayer from "@/layers/TianDiTuLayer";

const tianDiTuLayer = new TianDiTuLayer({
  id: "TianDiTu",
  title: "TianDiTu",
  url: "https://t5.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=your_token",
});

export default tianDiTuLayer;`,
    layer: tianDiTuLayer,
  },
  Graphics: {
    code: `import GraphicsLayer from "@/layers/GraphicsLayer";
import Graphic from "@/Graphic";
import Point from "@/geometry/Point";
import Polyline from "@/geometry/Polyline";
import Polygon from "@/geometry/Polygon";
import { SimpleMarkerSymbol } from "@/symbols/SimpleMarkerSymbol";
import { SimpleLineSymbol } from "@/symbols/SimpleLineSymbol";
import { SimpleFillSymbol } from "@/symbols/SimpleFillSymbol";
import { Color } from "@/Color";

const pointGeometry = new Point({ longitude: 120, latitude: 30 });
const markerSymbol = new SimpleMarkerSymbol(
  new Color([255, 0, 0, 1]),
  "circle",
);
const pointGraphic = new Graphic({
  geometry: pointGeometry,
  symbol: markerSymbol,
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
const lineSymbol = new SimpleLineSymbol(new Color([0, 0, 255, 1]), 2);
const lineGraphic = new Graphic({
  geometry: lineGeometry,
  symbol: lineSymbol,
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
const fillSymbol = new SimpleFillSymbol(
  new Color([0, 255, 0, 0.5]),
  "solid",
  lineSymbol,
);
const polygonGraphic = new Graphic({
  geometry: polygonGeometry,
  symbol: fillSymbol,
});

const graphicsLayer = new GraphicsLayer({
  id: "Graphics",
  graphics: [pointGraphic, lineGraphic, polygonGraphic],
});

export default graphicsLayer;`,
    layer: graphicsLayer,
  },
  World_Street_Map: {
    code: `import MapImageLayer from "@/layers/MapImageLayer";

const mapImageLayer = new MapImageLayer({
  id: "World_Street_Map",
  title: "World_Street_Map",
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/WorldTimeZones/MapServer",
});

export default mapImageLayer;`,
    layer: mapImageLayer,
  },
  "Feature Layer": {
    code: `import FeatureLayer from "@/layers/FeatureLayer";
import { SimpleMarkerSymbol } from "@/symbols/SimpleMarkerSymbol";
import { SimpleRenderer } from "@/renderers/SimpleRenderer";
import { Color } from "@/Color";

const urlFeatureLayer = new FeatureLayer({
  id: "URLFeature",
  title: "Feature Layer",
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/128peaks/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&f=pjson",
  renderer: new SimpleRenderer(new SimpleMarkerSymbol(new Color([255, 0, 0, 1]), "circle", undefined, "8px")),
});

export default urlFeatureLayer;`,
    layer: urlFeatureLayer,
  },
  "Feature Layer(source)": {
    code: `import FeatureLayer from "@/layers/FeatureLayer";
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
  id: "FeatureSource",
  title: "Feature Layer(source)",
  source: [featureGraphic1, featureGraphic2],
});

export default sourceFeatureLayer;`,
    layer: sourceFeatureLayer,
  },
  GeoJSON: {
    code: `import GeoJSONLayer from "@/layers/GeoJSONLayer";

const geojsonLayer = new GeoJSONLayer({
  id: "GeoJSON",
  title: "GeoJSON Layer",
  url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
});

export default geojsonLayer;`,
    layer: geojsonLayer,
  },
};

export const layerIdToName: Record<string, string> = {
  Tile: "TileLayer",
  "OSM Tile": "OpenStreetMapLayer",
  TianDiTu: "TianDiTuLayer",
  Graphics: "GraphicsLayer",
  World_Street_Map: "MapImageLayer",
  "Feature Layer": "FeatureLayer",
  "Feature Layer(source)": "FeatureLayer",
  GeoJSON: "GeoJSONLayer",
};
