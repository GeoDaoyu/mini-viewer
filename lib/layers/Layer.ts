import MapView from "@/views/MapView";
import LayerView from "@/views/layers/LayerView";

export type LayerType =
  | "base-dynamic"
  | "base-elevation"
  | "base-tile"
  | "bing-maps"
  | "building-scene"
  | "catalog"
  | "catalog-footprint"
  | "catalog-dynamic-group"
  | "csv"
  | "dimension"
  | "elevation"
  | "feature"
  | "geo-rss"
  | "geojson"
  | "parquet"
  | "gaussian-splat"
  | "graphics"
  | "group"
  | "imagery"
  | "imagery-tile"
  | "integrated-mesh"
  | "integrated-mesh-3dtiles"
  | "kml"
  | "knowledge-graph"
  | "knowledge-graph-sublayer"
  | "line-of-sight"
  | "link-chart"
  | "map-image"
  | "map-notes"
  | "media"
  | "video"
  | "ogc-feature"
  | "open-street-map"
  | "oriented-imagery"
  | "point-cloud"
  | "route"
  | "scene"
  | "stream"
  | "subtype-group"
  | "tile"
  | "unknown"
  | "unsupported"
  | "vector-tile"
  | "viewshed"
  | "voxel"
  | "wcs"
  | "web-tile"
  | "wfs"
  | "wms"
  | "wmts";

export interface LayerProperties {
  id: string;
  title?: string;
  type?: LayerType;
}

export default class Layer {
  id: string;
  title?: string;
  readonly type: LayerType;

  constructor(properties: LayerProperties) {
    this.id = properties.id;
    this.title = properties.title;
    this.type = properties.type || "unknown";
  }
  createLayerView(view: MapView): LayerView {
    return new LayerView({ view, layer: this });
  }
}
