import MapView from "@/views/MapView";
import Map from "@/Map";
import { layerExamples, layerIdToName } from "./examples";

const map = new Map();
const view = new MapView({
  map,
  container: "view",
  center: [120, 30],
  zoom: 6,
});

view.map.add(layerExamples.Tile.layer);

const codePanelTitle = document.getElementById(
  "code-panel-title",
) as HTMLSpanElement;
const codeDisplay = document.getElementById("code-display") as HTMLElement;
const prevBtn = document.getElementById("code-prev-btn") as HTMLButtonElement;
const nextBtn = document.getElementById("code-next-btn") as HTMLButtonElement;

const layerConfig = [
  { id: "Tile", checkboxId: "tile-layer" },
  { id: "OSM Tile", checkboxId: "openstreetmap-layer" },
  { id: "Graphics", checkboxId: "graphics-layer" },
  { id: "World_Street_Map", checkboxId: "mapimage-layer" },
  { id: "Feature", checkboxId: "feature-layer" },
  { id: "GeoJSON", checkboxId: "geojson-layer" },
] as const;

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

function toggleLayer(layerId: string) {
  const layer = layerExamples[layerId].layer;
  const exists = view.map.findLayerById(layerId);

  if (exists) {
    view.map.remove(layer);
    const index = activeLayers.indexOf(layerId);
    if (index > -1) {
      activeLayers.splice(index, 1);
      if (currentLayerIndex >= activeLayers.length) {
        currentLayerIndex = Math.max(0, activeLayers.length - 1);
      }
    }
  } else {
    view.map.add(layer);
    if (!activeLayers.includes(layerId)) {
      activeLayers.push(layerId);
    }
  }
  updateCodePanel();
}

layerConfig.forEach(({ id, checkboxId }) => {
  const checkbox = document.getElementById(checkboxId) as HTMLInputElement;
  checkbox?.addEventListener("change", () => toggleLayer(id));
});

updateCodePanel();
