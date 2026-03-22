import FeatureLayer from "@/layers/FeatureLayer";

const featureLayer = new FeatureLayer({
  id: "FeatureLayer",
  title: "FeatureLayer",
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/128peaks/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&f=pjson",
});

export default featureLayer;
