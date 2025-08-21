import SpatialReference from "../../geometry/SpatialReference";
import LOD from "./LOD";

export default class TileInfo {
  dpi: number;
  rows: number;
  cols: number;
  compressionQuality: number;
  // TODO: Point
  origin: { x: number; y: number };
  spatialReference: SpatialReference;
  lods: LOD[];
  format: string;

  constructor(options: any = {}) {
    this.dpi = options.dpi || 96;
    this.rows = options.rows || 256;
    this.cols = options.cols || 256;
    this.compressionQuality = options.compressionQuality || 0;
    this.origin = options.origin || { x: 0, y: 0 };
    this.spatialReference = options.spatialReference || { wkid: 4326 };
    this.lods = options.lods || [];
    this.format = options.format || "png";
  }

  static readonly WebMercator = new TileInfo({
    dpi: 96,
    rows: 256,
    cols: 256,
    compressionQuality: 0,
    origin: {
      x: -20037508.342787,
      y: 20037508.342787,
    },
    spatialReference: SpatialReference.WebMercator,
    lods: [
      { level: 0, resolution: 156543.033928, scale: 591657527.591555 },
      { level: 1, resolution: 78271.516964, scale: 295828763.795777 },
      { level: 2, resolution: 39135.758482, scale: 147914381.897889 },
      { level: 3, resolution: 19567.879241, scale: 73957190.948944 },
      { level: 4, resolution: 9783.9396205, scale: 36978595.474472 },
      { level: 5, resolution: 4891.96981025, scale: 18489297.737236 },
      { level: 6, resolution: 2445.984905125, scale: 9244648.868618 },
      { level: 7, resolution: 1222.9924525625, scale: 4622324.434309 },
      { level: 8, resolution: 611.49622628125, scale: 2311162.217155 },
      { level: 9, resolution: 305.748113140625, scale: 1155581.108577 },
      { level: 10, resolution: 152.8740565703125, scale: 577790.554289 },
      { level: 11, resolution: 76.43702828515625, scale: 288895.277144 },
      { level: 12, resolution: 38.218514142578125, scale: 144447.638572 },
      { level: 13, resolution: 19.1092570712890625, scale: 72223.819286 },
      { level: 14, resolution: 9.5546285356445312, scale: 36111.909643 },
      { level: 15, resolution: 4.7773142678222656, scale: 18055.954822 },
      { level: 16, resolution: 2.3886571339111328, scale: 9027.977411 },
      { level: 17, resolution: 1.1943285669555664, scale: 4513.988705 },
      { level: 18, resolution: 0.5971642834777832, scale: 2256.994353 },
      { level: 19, resolution: 0.2985821417388916, scale: 1128.497176 },
      { level: 20, resolution: 0.1492910708694458, scale: 564.248588 },
      { level: 21, resolution: 0.0746455354347229, scale: 282.124294 },
      { level: 22, resolution: 0.03732276771736145, scale: 141.062147 },
      { level: 23, resolution: 0.018661383858680725, scale: 70.5310735 },
    ] as LOD[],
    format: "png",
  });
}
