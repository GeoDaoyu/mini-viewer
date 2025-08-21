export default class SpatialReference {
  static readonly WebMercator = {
    wkid: 102100,
    latestWkid: 3857,
  };
  static readonly WGS84 = {
    wkid: 4326,
    latestWkid: 4326,
  };

  wkid?: number;
  latestWkid?: number;

  constructor(wkid?: number, latestWkid?: number) {
    this.wkid = wkid;
    this.latestWkid = latestWkid;
  }
}
