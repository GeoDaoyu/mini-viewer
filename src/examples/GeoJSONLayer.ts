import GeoJSONLayer from "@/layers/GeoJSONLayer";

const geojsonLayer = new GeoJSONLayer({
  id: "GeoJSON",
  title: "GeoJSON Layer",
  url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
});

export const code = `import GeoJSONLayer from "@/layers/GeoJSONLayer";

const geojsonLayer = new GeoJSONLayer({
  id: "GeoJSON",
  title: "GeoJSON Layer",
  url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
});

export default geojsonLayer;`;

export default geojsonLayer;
