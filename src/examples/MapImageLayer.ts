import MapImageLayer from "@/layers/MapImageLayer";

const mapImageLayer = new MapImageLayer({
  id: "MapImageLayer",
  title: "MapImageLayer",
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/WorldTimeZones/MapServer",
});

export default mapImageLayer;
