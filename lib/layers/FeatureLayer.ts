import Layer, { LayerProperties, LayerType } from "./Layer";
import Graphic from "@/Graphic";
import MapView from "@/views/MapView";
import FeatureLayerView from "@/views/layers/FeatureLayerView";
import { Renderer } from "@/renderers/Renderer";
import Point from "@/geometry/Point";
import Polyline from "@/geometry/Polyline";
import Polygon from "@/geometry/Polygon";
import { xyToLngLat } from "@/geometry/support/webMercatorUtils";

export interface FeatureLayerProperties extends LayerProperties {
  source?: Graphic[];
  url?: string;
  renderer?: Renderer;
}

export default class FeatureLayer extends Layer {
  readonly type: LayerType = "feature";
  url?: string;
  source: Graphic[];
  renderer?: Renderer;

  constructor(properties: FeatureLayerProperties) {
    super(properties);
    this.url = properties.url;
    this.source = properties.source || [];
    this.renderer = properties.renderer;

    if (properties.url) {
      this.loadFromUrl(properties.url);
    }
  }

  private async loadFromUrl(url: string) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.parseArcGISFeatures(data);
    } catch (error) {
      console.error("Failed to load FeatureLayer:", error);
    }
  }

  private parseArcGISFeatures(data: any) {
    const { features, geometryType, spatialReference } = data;

    if (!features || !Array.isArray(features)) {
      return;
    }

    const isWebMercator =
      spatialReference?.wkid === 102100 ||
      spatialReference?.latestWkid === 3857;

    this.source = features.map((feature: any) => {
      const geometry = this.createGeometry(
        feature.geometry,
        geometryType,
        isWebMercator,
      );
      return new Graphic({
        geometry,
        attributes: feature.attributes || {},
        symbol: undefined,
      });
    });
  }

  private createGeometry(
    arcgisGeometry: any,
    geometryType: string,
    isWebMercator: boolean,
  ) {
    if (
      geometryType === "esriGeometryPoint" ||
      arcgisGeometry.x !== undefined
    ) {
      let longitude: number, latitude: number;

      if (isWebMercator) {
        [longitude, latitude] = xyToLngLat(arcgisGeometry.x, arcgisGeometry.y);
      } else {
        longitude = arcgisGeometry.x;
        latitude = arcgisGeometry.y;
      }

      return new Point({ longitude, latitude });
    }

    if (geometryType === "esriGeometryPolyline" || arcgisGeometry.paths) {
      const paths = arcgisGeometry.paths.map((path: number[][]) => {
        return path.map(([x, y]) => {
          if (isWebMercator) {
            return xyToLngLat(x, y);
          }
          return [x, y];
        });
      });
      return new Polyline({ paths });
    }

    if (geometryType === "esriGeometryPolygon" || arcgisGeometry.rings) {
      const rings = arcgisGeometry.rings.map((ring: number[][]) => {
        return ring.map(([x, y]) => {
          if (isWebMercator) {
            return xyToLngLat(x, y);
          }
          return [x, y];
        });
      });
      return new Polygon({ rings });
    }

    throw new Error(`Unsupported geometry type: ${geometryType}`);
  }

  createLayerView(view: MapView): FeatureLayerView {
    return new FeatureLayerView({ view, layer: this });
  }
}
