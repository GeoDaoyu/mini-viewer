export interface LayerExample {
  code: string;
  layer: any;
}

interface LayerModule {
  default: any;
  code?: string;
  sourceCode?: string;
  urlCode?: string;
  sourceFeatureLayer?: any;
  urlFeatureLayer?: any;
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
  "Feature Layer(source)": "./FeatureLayer.ts",
  GeoJSON: "./GeoJSONLayer.ts",
};

export const layerExamples: Record<string, LayerExample> = {};

for (const [id, filePath] of Object.entries(moduleMap)) {
  const module = modules[filePath];
  let code: string;
  let layer: any;

  if (id === "Feature Layer") {
    code = module.urlCode || module.code || "";
    layer = module.urlFeatureLayer;
  } else if (id === "Feature Layer(source)") {
    code = module.sourceCode || module.code || "";
    layer = module.sourceFeatureLayer;
  } else {
    code = module.code || "";
    layer = module.default;
  }

  layerExamples[id] = { code, layer };
}

export { layerIdToName };
