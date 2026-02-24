import LayerView from './LayerView';
import GraphicsLayer from '../../layers/GraphicsLayer';
import { lngLatToXY } from '../../geometry/support/webMercatorUtils';
import { SimpleMarkerSymbol } from '../../symbols/SimpleMarkerSymbol';
import { SimpleLineSymbol } from '../../symbols/SimpleLineSymbol';
import { SimpleFillSymbol } from '../../symbols/SimpleFillSymbol';
import { SimpleRenderer } from '../../renderers/SimpleRenderer';
import MapView from "../MapView";

export default class GraphicsLayerView extends LayerView {
  layer: GraphicsLayer;

  constructor(properties: { view: MapView; layer: GraphicsLayer }) {
    super(properties);
    this.layer = properties.layer;
  }

  async render() {
    const { canvas } = this.view;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    for (const graphic of this.layer.graphics) {
      const symbol = graphic.symbol || (this.layer.renderer instanceof SimpleRenderer ? this.layer.renderer.symbol : null);
      if (!symbol) continue;

      if (graphic.geometry.type === 'point' && 'longitude' in graphic.geometry && 'latitude' in graphic.geometry) {
        const mapPoint = lngLatToXY((graphic.geometry as any).longitude, (graphic.geometry as any).latitude);
        const [screenX, screenY] = this.mapToScreen(mapPoint[0], mapPoint[1]);

        if (symbol.type === 'simple-marker') {
          this.renderMarker(ctx, screenX, screenY, symbol as SimpleMarkerSymbol);
        }
      } else if (graphic.geometry.type === 'polyline' && 'paths' in graphic.geometry) {
        this.renderPolyline(ctx, (graphic.geometry as any).paths, symbol as SimpleLineSymbol);
      } else if (graphic.geometry.type === 'polygon' && 'rings' in graphic.geometry) {
        this.renderPolygon(ctx, (graphic.geometry as any).rings, symbol as SimpleFillSymbol);
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

  private renderPolyline(ctx: CanvasRenderingContext2D, paths: number[][][], symbol: SimpleLineSymbol) {
    ctx.beginPath();
    
    for (const path of paths) {
      if (path.length === 0) continue;
      
      const [firstLng, firstLat] = path[0];
      const [firstX, firstY] = this.mapToScreen(...lngLatToXY(firstLng, firstLat));
      ctx.moveTo(firstX, firstY);
      
      for (let i = 1; i < path.length; i++) {
        const [lng, lat] = path[i];
        const [x, y] = this.mapToScreen(...lngLatToXY(lng, lat));
        ctx.lineTo(x, y);
      }
    }
    
    ctx.strokeStyle = `rgba(${symbol.color.r}, ${symbol.color.g}, ${symbol.color.b}, ${symbol.color.a})`;
    ctx.lineWidth = symbol.width || 1;
    ctx.stroke();
  }

  private renderPolygon(ctx: CanvasRenderingContext2D, rings: number[][][], symbol: SimpleFillSymbol) {
    ctx.beginPath();
    
    for (const ring of rings) {
      if (ring.length === 0) continue;
      
      const [firstLng, firstLat] = ring[0];
      const [firstX, firstY] = this.mapToScreen(...lngLatToXY(firstLng, firstLat));
      ctx.moveTo(firstX, firstY);
      
      for (let i = 1; i < ring.length; i++) {
        const [lng, lat] = ring[i];
        const [x, y] = this.mapToScreen(...lngLatToXY(lng, lat));
        ctx.lineTo(x, y);
      }
      
      ctx.closePath();
    }
    
    if (symbol.color) {
      ctx.fillStyle = `rgba(${symbol.color.r}, ${symbol.color.g}, ${symbol.color.b}, ${symbol.color.a})`;
      ctx.fill();
    }
    
    if (symbol.outline) {
      ctx.strokeStyle = `rgba(${symbol.outline.color.r}, ${symbol.outline.color.g}, ${symbol.outline.color.b}, ${symbol.outline.color.a})`;
      ctx.lineWidth = symbol.outline.width || 1;
      ctx.stroke();
    }
  }
}
