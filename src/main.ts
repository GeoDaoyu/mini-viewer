import MapView from "@/views/MapView";
import Map from "@/Map";
import { layerExamples, layerIdToName } from "./examples";

const map = new Map();
const view = new MapView({
  map,
  container: "view",
  center: [120, 30],
  zoom: 4,
});

view.map.add(layerExamples.Tile.layer);

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
  const layerData = layerExamples[currentLayerId];
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
  toggleLayer(e.target as HTMLInputElement, layerExamples.Tile.layer, "Tile");
});

openStreetMapLayerCheckbox?.addEventListener("change", (e) => {
  toggleLayer(
    e.target as HTMLInputElement,
    layerExamples["OSM Tile"].layer,
    "OSM Tile",
  );
});

graphicsLayerCheckbox?.addEventListener("change", (e) => {
  toggleLayer(
    e.target as HTMLInputElement,
    layerExamples.Graphics.layer,
    "Graphics",
  );
});

mapImageLayerCheckbox?.addEventListener("change", (e) => {
  toggleLayer(
    e.target as HTMLInputElement,
    layerExamples.World_Street_Map.layer,
    "World_Street_Map",
  );
});

featureLayerCheckbox?.addEventListener("change", (e) => {
  toggleLayer(
    e.target as HTMLInputElement,
    layerExamples.Feature.layer,
    "Feature",
  );
});

geojsonLayerCheckbox?.addEventListener("change", (e) => {
  toggleLayer(
    e.target as HTMLInputElement,
    layerExamples.GeoJSON.layer,
    "GeoJSON",
  );
});

updateCodePanel();
