import OpenStreetMapLayer from "@/layers/OpenStreetMapLayer";

const openStreetMapLayer = new OpenStreetMapLayer({
  id: "OSM Tile",
  title: "OSM Tile",
  url: "https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=6ZGpPKRz8wRa8nV56Gwt",
});

export const code = `import OpenStreetMapLayer from "@/layers/OpenStreetMapLayer";

const openStreetMapLayer = new OpenStreetMapLayer({
  id: "OSM Tile",
  title: "OSM Tile",
  url: "https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=6ZGpPKRz8wRa8nV56Gwt",
});

export default openStreetMapLayer;`;

export default openStreetMapLayer;
