import Layer, { LayerProperties, LayerType } from "./Layer";
import Graphic from "@/Graphic";
import { Renderer } from "@/renderers/Renderer";
import MapView from "@/views/MapView";
import GeoJSONLayerView from "@/views/layers/GeoJSONLayerView";
import { geojsonToArcGIS } from "@terraformer/arcgis";
import Point from "@/geometry/Point";
import Polyline from "@/geometry/Polyline";
import Polygon from "@/geometry/Polygon";

export interface GeoJSONLayerProperties extends LayerProperties {
  url: string;
  renderer?: Renderer;
}

export default class GeoJSONLayer extends Layer {
  readonly type: LayerType = "geojson";
  url: string;
  protected source: Graphic[] = [];
  renderer?: Renderer;

  constructor(properties: GeoJSONLayerProperties) {
    super(properties);
    this.url = properties.url;
    this.renderer = properties.renderer;

    this.loadFromUrl(properties.url);
  }

  private async loadFromUrl(url: string) {
    try {
      const response = await fetch(url);
      const geojson = await response.json();
      this.parseGeoJSON(geojson);
    } catch (error) {
      console.error("Failed to load GeoJSON:", error);
    }
  }

  private parseGeoJSON(geojson: any) {
    const features =
      geojson.type === "FeatureCollection" ? geojson.features : [geojson];

    this.source = features.map((feature: any) => {
      const arcgisGeometry = geojsonToArcGIS(feature.geometry);
      const geometry = this.createGeometry(arcgisGeometry);
      return new Graphic({
        geometry,
        attributes: feature.properties || {},
        symbol: undefined,
      });
    });
  }

  private createGeometry(arcgisGeometry: any) {
    if (arcgisGeometry.x !== undefined && arcgisGeometry.y !== undefined) {
      return new Point({
        longitude: arcgisGeometry.x,
        latitude: arcgisGeometry.y,
      });
    }

    if (arcgisGeometry.paths) {
      return new Polyline({ paths: arcgisGeometry.paths });
    }

    if (arcgisGeometry.rings) {
      return new Polygon({ rings: arcgisGeometry.rings });
    }

    throw new Error("Unsupported geometry type");
  }

  createLayerView(view: MapView): GeoJSONLayerView {
    return new GeoJSONLayerView({ view, layer: this });
  }
}
