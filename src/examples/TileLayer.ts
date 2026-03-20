import TileLayer from "@/layers/TileLayer";

const tileLayer = new TileLayer({
  id: "Tile",
  title: "Tile",
  url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
});

export const code = `import TileLayer from "@/layers/TileLayer";

const tileLayer = new TileLayer({
  id: "Tile",
  title: "Tile",
  url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
});

export default tileLayer;`;

export default tileLayer;
