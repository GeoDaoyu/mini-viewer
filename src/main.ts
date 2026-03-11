import MapView from "@/views/MapView";
import Map from "@/Map";
import MapImageLayer from "@/layers/MapImageLayer";
import OSMTileLayer from "@/layers/OSMTileLayer";
import GraphicsLayer from "@/layers/GraphicsLayer";
import FeatureLayer from "@/layers/FeatureLayer";
import GeoJSONLayer from "@/layers/GeoJSONLayer";
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

const tileLayer = new OSMTileLayer({
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

const polygon1 = new Polygon({
  rings: [
    [
      [115, 25],
      [125, 25],
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

const featureLayer = new FeatureLayer({
  id: "Feature",
  title: "Feature Layer",
  source: [featureGraphic1, featureGraphic2],
});

const geojsonLayer = new GeoJSONLayer({
  id: "GeoJSON",
  title: "GeoJSON Layer",
  url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
});

const graphicsLayerCheckbox = document.getElementById(
  "graphics-layer",
) as HTMLInputElement;
const mapImageLayerCheckbox = document.getElementById(
  "mapimage-layer",
) as HTMLInputElement;
const featureLayerCheckbox = document.getElementById(
  "feature-layer",
) as HTMLInputElement;
const geojsonLayerCheckbox = document.getElementById(
  "geojson-layer",
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

featureLayerCheckbox?.addEventListener("change", (e) => {
  const checked = (e.target as HTMLInputElement).checked;
  if (checked) {
    if (!view.map.findLayerById("Feature")) {
      view.map.add(featureLayer);
    }
  } else {
    const layer = view.map.findLayerById("Feature");
    if (layer) {
      view.map.remove(layer);
    }
  }
});
geojsonLayerCheckbox?.addEventListener("change", (e) => {
  const checked = (e.target as HTMLInputElement).checked;
  if (checked) {
    if (!view.map.findLayerById("GeoJSON")) {
      view.map.add(geojsonLayer);
    }
  } else {
    const layer = view.map.findLayerById("GeoJSON");
    if (layer) {
      view.map.remove(geojsonLayer);
    }
  }
});
