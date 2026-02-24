import "./style.css";
import MapView from "@/views/MapView";
import Map from "@/Map";
// import MapImageLayer from "@/layers/MapImageLayer";
import TileLayer from "@/layers/TileLayer";
import GraphicsLayer from "@/layers/GraphicsLayer";
import Graphic from "@/Graphic";
import Point from "@/geometry/Point";
import { SimpleMarkerSymbol } from "@/symbols/SimpleMarkerSymbol";
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

const graphicsLayer = new GraphicsLayer({
  url: '',
  id: 'Graphics',
  graphics: [pointGraphic]
});

view.map.add(graphicsLayer);
