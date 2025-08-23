export interface DOMContainerProperties {
  container: string;
}

export default class DOMContainer {
  private container: HTMLDivElement;
  public canvas: HTMLCanvasElement;

  constructor(properties: DOMContainerProperties) {
    const containerElement = document.getElementById(properties.container);
    if (!containerElement) {
      throw new Error(`element with id '${properties.container}' not found`);
    }
    this.container = containerElement as HTMLDivElement;
    this.canvas = this.createCanvasContainer();
    this.bindCanvasEvents();
  }

  private createCanvasContainer(): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.width = this.container.clientWidth;
    canvas.height = this.container.clientHeight;
    this.container.appendChild(canvas);
    return canvas;
  }

  private bindCanvasEvents(): void {
    this.canvas.addEventListener("wheel", (event: WheelEvent) => {
      this.handleWheel(event);
    });
    this.canvas.addEventListener("dblclick", (event: MouseEvent) => {
      this.handleDoubleClick(event);
    });
  }

  protected handleWheel(event: WheelEvent): void {
    event.preventDefault();
  }

  protected handleDoubleClick(event: MouseEvent): void {
    event.preventDefault();
  }
}
