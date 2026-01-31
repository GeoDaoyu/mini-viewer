export class Color {
  a: number;
  b: number;
  g: number;
  r: number;

  constructor(r: number | number[], g?: number, b?: number, a: number = 1) {
    if (Array.isArray(r)) {
      this.r = r[0];
      this.g = r[1];
      this.b = r[2];
      this.a = r[3] !== undefined ? r[3] : a;
    } else {
      this.r = r;
      this.g = g!;
      this.b = b!;
      this.a = a;
    }
  }
}
