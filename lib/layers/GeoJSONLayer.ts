import Layer, { LayerProperties, LayerType } from './Layer';
import Graphic from '@/Graphic';
import { Renderer } from '@/renderers/Renderer';
import MapView from '@/views/MapView';
import GeoJSONLayerView from '@/views/layers/GeoJSONLayerView';
import { geojsonToArcGIS } from '@terraformer/arcgis';
import Point from '@/geometry/Point';
import Polyline from '@/geometry/Polyline';
import Polygon from '@/geometry/Polygon';
import { xyToLngLat } from '@/geometry/support/webMercatorUtils';

export interface GeoJSONLayerProperties extends LayerProperties {
  url?: string;
  source?: Graphic[];
  renderer?: Renderer;
}

export default class GeoJSONLayer extends Layer {
  readonly type: LayerType = "geojson";
  url?: string;
  private _source: Graphic[] = [];
  renderer?: Renderer;

  constructor(properties: GeoJSONLayerProperties) {
    super(properties);
    this.url = properties.url;
    this.renderer = properties.renderer;
    
    if (properties.source) {
      this._source = properties.source;
    } else if (properties.url) {
      this.loadFromUrl(properties.url);
    }
  }

  get source(): Graphic[] {
    return this._source;
  }

  private async loadFromUrl(url: string) {
    try {
      const response = await fetch(url);
      const geojson = await response.json();
      this.parseGeoJSON(geojson);
    } catch (error) {
      console.error('Failed to load GeoJSON:', error);
    }
  }

  private parseGeoJSON(geojson: any) {
    const features = geojson.type === 'FeatureCollection' 
      ? geojson.features 
      : [geojson];

    this._source = features.map((feature: any) => {
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
      const [lng, lat] = xyToLngLat(arcgisGeometry.x, arcgisGeometry.y);
      return new Point({ longitude: lng, latitude: lat });
    }

    if (arcgisGeometry.paths) {
      return new Polyline({ paths: this.convertPaths(arcgisGeometry.paths) });
    }

    if (arcgisGeometry.rings) {
      return new Polygon({ rings: this.convertPaths(arcgisGeometry.rings) });
    }

    throw new Error('Unsupported geometry type');
  }

  private convertPaths(paths: number[][][]): number[][][] {
    return paths.map(path => 
      path.map(point => {
        const [lng, lat] = xyToLngLat(point[0], point[1]);
        return [lng, lat];
      })
    );
  }

  createLayerView(view: MapView): GeoJSONLayerView {
    return new GeoJSONLayerView({ view, layer: this });
  }
}
