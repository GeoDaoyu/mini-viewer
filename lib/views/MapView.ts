interface MapViewProperties {
  container: string;
}

export default class MapView {
  container: HTMLDivElement;
  canvas: HTMLCanvasElement;
  constructor(properties: MapViewProperties) {
    this.container = document.getElementById(
      properties.container
    ) as HTMLDivElement;
    this.canvas = this.createCanvasContainer();
  }
  private createCanvasContainer() {
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.width = this.container.clientWidth;
    canvas.height = this.container.clientHeight;
    this.container.appendChild(canvas);
    return canvas;
  }
}
