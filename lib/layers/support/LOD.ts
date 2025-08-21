export default class LOD {
  level: number;
  resolution: number;
  scale: number;

  constructor(level: number, resolution: number, scale: number) {
    this.level = level;
    this.resolution = resolution;
    this.scale = scale;
  }
}
