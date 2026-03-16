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

tileLayerCheckbox?.addEventListener("change", (e) => {
  const checked = (e.target as HTMLInputElement).checked;
  if (checked) {
    if (!view.map.findLayerById("Tile")) {
      view.map.add(tileLayer);
    }
  } else {
    const layer = view.map.findLayerById("Tile");
    if (layer) {
      view.map.remove(tileLayer);
    }
  }
});

openStreetMapLayerCheckbox?.addEventListener("change", (e) => {
  const checked = (e.target as HTMLInputElement).checked;
  if (checked) {
    if (!view.map.findLayerById("OSM Tile")) {
      view.map.add(openStreetMapLayer);
    }
  } else {
    const layer = view.map.findLayerById("OSM Tile");
    if (layer) {
      view.map.remove(openStreetMapLayer);
    }
  }
});

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
