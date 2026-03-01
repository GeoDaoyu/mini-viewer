import MapView from "@/views/MapView";
import Map from "@/Map";
import MapImageLayer from "@/layers/MapImageLayer";
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

const tileLayer = new TileLayer({
  id: "OSM Tile",
  title: "OSM Tile",
  url: "",
});
view.map.add(tileLayer);

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

const mapImageLayer = new MapImageLayer({
  id: "World_Street_Map",
  title: "World_Street_Map",
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/WorldTimeZones/MapServer",
});

const graphicsLayerCheckbox = document.getElementById(
  "graphics-layer",
) as HTMLInputElement;
const mapImageLayerCheckbox = document.getElementById(
  "mapimage-layer",
) as HTMLInputElement;

graphicsLayerCheckbox?.addEventListener("change", (e) => {
  const checked = (e.target as HTMLInputElement).checked;
  if (checked) {
    if (!view.map.findLayerById("Graphics")) {
      view.map.add(graphicsLayer);
    }
  } else {
    const layer = view.map.findLayerById("Graphics");
    if (layer) {
      view.map.remove(layer);
    }
  }
});

mapImageLayerCheckbox?.addEventListener("change", (e) => {
  const checked = (e.target as HTMLInputElement).checked;
  if (checked) {
    if (!view.map.findLayerById("World_Street_Map")) {
      view.map.add(mapImageLayer);
    }
  } else {
    const layer = view.map.findLayerById("World_Street_Map");
    if (layer) {
      view.map.remove(layer);
    }
  }
});
