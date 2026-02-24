import "./style.css";
import MapView from "@/views/MapView";
import Map from "@/Map";
// import MapImageLayer from "@/layers/MapImageLayer";
import TileLayer from "@/layers/TileLayer";
import GraphicsLayer from "@/layers/GraphicsLayer";
import Graphic from "@/Graphic";
import Point from "@/geometry/Point";
import Polyline from "@/geometry/Polyline";
import Polygon from "@/geometry/Polygon";
import { SimpleMarkerSymbol } from "@/symbols/SimpleMarkerSymbol";
import { SimpleLineSymbol } from "@/symbols/SimpleLineSymbol";
import { SimpleFillSymbol } from "@/symbols/SimpleFillSymbol";
import { Color } from "@/Color";

const map = new Map();
const view = new MapView({
  map,
  container: "view",
  center: [120, 30],
  zoom: 4,
});
// const mapImageLayer = new MapImageLayer({
//   id: "World_Street_Map",
//   title: "World_Street_Map",
//   url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/WorldTimeZones/MapServer",
// });
// view.map.add(mapImageLayer);

const tileLayer = new TileLayer({
  id: "OSM Tile",
  title: "OSM Tile",
  url: "",
});
view.map.add(tileLayer);

// 创建包含点 [120, 30] 的 GraphicsLayer
const pointGeometry = new Point({ longitude: 120, latitude: 30 });
const markerSymbol = new SimpleMarkerSymbol(new Color([255, 0, 0, 1]), 'circle');
const pointGraphic = new Graphic({
  geometry: pointGeometry,
  symbol: markerSymbol,
});

// 创建线图形
const lineGeometry = new Polyline({
  paths: [
    [[120, 30], [121, 31], [122, 30]] // 从 [120,30] 到 [121,31] 再到 [122,30]
  ]
});
const lineSymbol = new SimpleLineSymbol(new Color([0, 0, 255, 1]), 2);
const lineGraphic = new Graphic({
  geometry: lineGeometry,
  symbol: lineSymbol
});

// 创建面图形
const polygonGeometry = new Polygon({
  rings: [
    [[119, 29], [121, 29], [121, 31], [119, 31], [119, 29]] // 矩形，最后一点与第一点相同以闭合
  ]
});
const fillSymbol = new SimpleFillSymbol(new Color([0, 255, 0, 0.5]), 'solid', lineSymbol);
const polygonGraphic = new Graphic({
  geometry: polygonGeometry,
  symbol: fillSymbol
});

const graphicsLayer = new GraphicsLayer({
  url: '',
  id: 'Graphics',
  graphics: [pointGraphic, lineGraphic, polygonGraphic]
});

view.map.add(graphicsLayer);
