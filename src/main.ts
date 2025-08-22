import "./style.css";
import MapView from "../lib/views/MapView";
import Map from "../lib/Map";
import MapImageLayer from "../lib/layers/Layer";

const map = new Map();
const view = new MapView({
  map,
  container: "view",
});
const layer = new MapImageLayer({
  id: "World_Street_Map",
  title: "World_Street_Map",
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/WorldTimeZones/MapServer",
});
view.map.add(layer);
