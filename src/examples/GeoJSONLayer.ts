import GeoJSONLayer from "@/layers/GeoJSONLayer";

const geojsonLayer = new GeoJSONLayer({
  id: "GeoJSONLayer",
  title: "GeoJSONLayer",
  url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
});

export default geojsonLayer;
