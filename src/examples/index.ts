export interface LayerExample {
  code: string;
  layer: any;
}

interface LayerModule {
  default: any;
  code?: string;
}

const modules = import.meta.glob<LayerModule>("./*.ts", { eager: true });

const layerIdToName: Record<string, string> = {
  Tile: "TileLayer",
  "OSM Tile": "OpenStreetMapLayer",
  TianDiTu: "TianDiTuLayer",
  Graphics: "GraphicsLayer",
  World_Street_Map: "MapImageLayer",
  "Feature Layer": "FeatureLayer",
  "Feature Layer(source)": "FeatureLayer",
  GeoJSON: "GeoJSONLayer",
};

const moduleMap: Record<string, keyof typeof modules> = {
  Tile: "./TileLayer.ts",
  "OSM Tile": "./OpenStreetMapLayer.ts",
  TianDiTu: "./TianDiTuLayer.ts",
  Graphics: "./GraphicsLayer.ts",
  World_Street_Map: "./MapImageLayer.ts",
  "Feature Layer": "./FeatureLayer.ts",
  "Feature Layer(source)": "./FeatureLayerWithSource.ts",
  GeoJSON: "./GeoJSONLayer.ts",
};

export const layerExamples: Record<string, LayerExample> = {};

for (const [id, filePath] of Object.entries(moduleMap)) {
  const module = modules[filePath];
  layerExamples[id] = { code: module.code || "", layer: module.default };
}

export { layerIdToName };
