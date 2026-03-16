import MapView from "@/views/MapView";
import Map from "@/Map";
import tileLayer from "./examples/TileLayer";
import openStreetMapLayer from "./examples/OpenStreetMapLayer";
import graphicsLayer from "./examples/GraphicsLayer";
import mapImageLayer from "./examples/MapImageLayer";
import featureLayer from "./examples/FeatureLayer";
import geojsonLayer from "./examples/GeoJSONLayer";

const map = new Map();
const view = new MapView({
  map,
  container: "view",
  center: [120, 30],
  zoom: 4,
});

view.map.add(tileLayer);

const tileLayerCheckbox = document.getElementById(
  "tile-layer",
) as HTMLInputElement;
const openStreetMapLayerCheckbox = document.getElementById(
  "openstreetmap-layer",
) as HTMLInputElement;
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

const codePanelTitle = document.getElementById(
  "code-panel-title",
) as HTMLSpanElement;
const codeDisplay = document.getElementById(
  "code-display",
) as HTMLElement;
const prevBtn = document.getElementById("code-prev-btn") as HTMLButtonElement;
const nextBtn = document.getElementById("code-next-btn") as HTMLButtonElement;

const layerCodeMap: Record<string, { code: string; layer: any }> = {
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
  Feature: {
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

const featureLayer = new FeatureLayer({
  id: "Feature",
  title: "Feature Layer",
  source: [featureGraphic1, featureGraphic2],
});

export default featureLayer;`,
    layer: featureLayer,
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

const layerIdToName: Record<string, string> = {
  Tile: "TileLayer",
  "OSM Tile": "OpenStreetMapLayer",
  Graphics: "GraphicsLayer",
  World_Street_Map: "MapImageLayer",
  Feature: "FeatureLayer",
  GeoJSON: "GeoJSONLayer",
};

let activeLayers: string[] = ["Tile"];
let currentLayerIndex = 0;

function updateCodePanel() {
  if (activeLayers.length === 0) {
    codePanelTitle.textContent = "No Layer Selected";
    codeDisplay.textContent = "";
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    return;
  }

  if (currentLayerIndex >= activeLayers.length) {
    currentLayerIndex = activeLayers.length - 1;
  }

  const currentLayerId = activeLayers[currentLayerIndex];
  const layerData = layerCodeMap[currentLayerId];
  if (layerData) {
    codePanelTitle.textContent = layerIdToName[currentLayerId];
    codeDisplay.textContent = layerData.code;
  }

  prevBtn.disabled = currentLayerIndex === 0;
  nextBtn.disabled = currentLayerIndex === activeLayers.length - 1;
}

prevBtn?.addEventListener("click", () => {
  if (currentLayerIndex > 0) {
    currentLayerIndex--;
    updateCodePanel();
  }
});

nextBtn?.addEventListener("click", () => {
  if (currentLayerIndex < activeLayers.length - 1) {
    currentLayerIndex++;
    updateCodePanel();
  }
});

function toggleLayer(checkbox: HTMLInputElement, layer: any, layerId: string) {
  const checked = checkbox.checked;
  if (checked) {
    if (!view.map.findLayerById(layerId)) {
      view.map.add(layer);
      if (!activeLayers.includes(layerId)) {
        activeLayers.push(layerId);
      }
    }
  } else {
    const existingLayer = view.map.findLayerById(layerId);
    if (existingLayer) {
      view.map.remove(existingLayer);
    }
    const index = activeLayers.indexOf(layerId);
    if (index > -1) {
      activeLayers.splice(index, 1);
      if (currentLayerIndex >= activeLayers.length) {
        currentLayerIndex = Math.max(0, activeLayers.length - 1);
      }
    }
  }
  updateCodePanel();
}

tileLayerCheckbox?.addEventListener("change", (e) => {
  toggleLayer(e.target as HTMLInputElement, tileLayer, "Tile");
});

openStreetMapLayerCheckbox?.addEventListener("change", (e) => {
  toggleLayer(e.target as HTMLInputElement, openStreetMapLayer, "OSM Tile");
});

graphicsLayerCheckbox?.addEventListener("change", (e) => {
  toggleLayer(e.target as HTMLInputElement, graphicsLayer, "Graphics");
});

mapImageLayerCheckbox?.addEventListener("change", (e) => {
  toggleLayer(
    e.target as HTMLInputElement,
    mapImageLayer,
    "World_Street_Map",
  );
});

featureLayerCheckbox?.addEventListener("change", (e) => {
  toggleLayer(e.target as HTMLInputElement, featureLayer, "Feature");
});

geojsonLayerCheckbox?.addEventListener("change", (e) => {
  toggleLayer(e.target as HTMLInputElement, geojsonLayer, "GeoJSON");
});

updateCodePanel();
