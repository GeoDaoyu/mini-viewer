import LayerView from './LayerView';
import GeoJSONLayer from '../../layers/GeoJSONLayer';
import { lngLatToXY } from '../../geometry/support/webMercatorUtils';
import { SimpleMarkerSymbol } from '../../symbols/SimpleMarkerSymbol';
import { SimpleLineSymbol } from '../../symbols/SimpleLineSymbol';
import { SimpleFillSymbol } from '../../symbols/SimpleFillSymbol';
import { Color } from '../../Color';
import MapView from "../MapView";

export default class GeoJSONLayerView extends LayerView {
  layer: GeoJSONLayer;

  constructor(properties: { view: MapView; layer: GeoJSONLayer }) {
    super(properties);
    this.layer = properties.layer;
  }

  async render() {
    const { canvas } = this.view;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    for (const graphic of this.layer.source) {
      const symbol = graphic.symbol || (this.layer.renderer ? this.layer.renderer.symbol : null);
      if (!symbol) continue;

      const mapPoint = lngLatToXY(graphic.geometry.longitude, graphic.geometry.latitude);
      const [screenX, screenY] = this.mapToScreen(mapPoint[0], mapPoint[1]);

      if (symbol.type === 'simple-marker') {
        this.renderMarker(ctx, screenX, screenY, symbol as SimpleMarkerSymbol);
      } else if (symbol.type === 'simple-line') {
        this.renderMarker(ctx, screenX, screenY, new SimpleMarkerSymbol(symbol.color, 'circle', symbol));
      } else if (symbol.type === 'simple-fill') {
        this.renderMarker(ctx, screenX, screenY, new SimpleMarkerSymbol(symbol.color, 'circle', symbol));
      }
    }
  }

  private mapToScreen(mapX: number, mapY: number): [number, number] {
    const { canvas, tileInfo, zoom, center } = this.view;

    const currentLOD = tileInfo.lods.find((lod) => lod.level === zoom);
    if (!currentLOD) {
      throw new Error(`No LOD found for zoom level ${zoom}`);
    }

    const [centerLng, centerLat] = center;
    const [centerMapX, centerMapY] = lngLatToXY(centerLng, centerLat);

    const resolution = currentLOD.resolution;

    const canvasCenterX = canvas.width / 2;
    const canvasCenterY = canvas.height / 2;

    const offsetX = (mapX - centerMapX) / resolution;
    const offsetY = (mapY - centerMapY) / resolution;

    const screenX = canvasCenterX + offsetX;
    const screenY = canvasCenterY - offsetY; // Y轴翻转

    return [screenX, screenY];
  }

  private renderMarker(ctx: CanvasRenderingContext2D, x: number, y: number, symbol: SimpleMarkerSymbol) {
    const size = parseInt(symbol.size) || 8;
    const radius = size / 2;

    ctx.fillStyle = `rgba(${symbol.color.r}, ${symbol.color.g}, ${symbol.color.b}, ${symbol.color.a})`;

    if (symbol.style === 'circle') {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
    } else if (symbol.style === 'square') {
      ctx.fillRect(x - radius, y - radius, size, size);
    }

    if (symbol.outline) {
      ctx.strokeStyle = `rgba(${symbol.outline.color.r}, ${symbol.outline.color.g}, ${symbol.outline.color.b}, ${symbol.outline.color.a})`;
      ctx.lineWidth = 1; 

      if (symbol.style === 'circle') {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      } else if (symbol.style === 'square') {
        ctx.strokeRect(x - radius, y - radius, size, size);
      }
    }
  }
}
