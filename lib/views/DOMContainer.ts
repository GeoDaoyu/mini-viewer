import { Accessor } from "@geodaoyu/accessor";

export interface DOMContainerProperties {
  container: string;
}

export default class DOMContainer extends Accessor {
  private container: HTMLDivElement;
  public canvas: HTMLCanvasElement;

  constructor(properties: DOMContainerProperties) {
    super();
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

  // TODO: destroy
  private bindCanvasEvents(): void {
    this.canvas.addEventListener("wheel", (event: WheelEvent) => {
      this.handleWheel(event);
    });
    this.canvas.addEventListener("dblclick", (event: MouseEvent) => {
      this.handleDoubleClick(event);
    });
    this.canvas.addEventListener("mousedown", (event: MouseEvent) => {
      this.handleMouseDown(event);
    });
    this.canvas.addEventListener("mousemove", (event: MouseEvent) => {
      this.handleMouseMove(event);
    });
    this.canvas.addEventListener("mouseup", (event: MouseEvent) => {
      this.handleMouseUp(event);
    });
  }

  protected handleWheel(event: WheelEvent): void {
    event.preventDefault();
  }

  protected handleDoubleClick(event: MouseEvent): void {
    event.preventDefault();
  }

  protected handleMouseMove(event: MouseEvent): void {
    event.preventDefault();
  }

  protected handleMouseUp(event: MouseEvent): void {
    event.preventDefault();
  }

  protected handleMouseDown(event: MouseEvent): void {
    event.preventDefault();
  }
}
