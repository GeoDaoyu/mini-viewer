import MapImageLayer from "@/layers/MapImageLayer";

const mapImageLayer = new MapImageLayer({
  id: "World_Street_Map",
  title: "World_Street_Map",
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/WorldTimeZones/MapServer",
});

export default mapImageLayer;
