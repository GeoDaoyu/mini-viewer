import { Color } from '../Color';

export class Symbol {
  color: Color;
  readonly type: string;

  constructor(color: Color, type: string) {
    this.color = color;
    this.type = type;
  }
}
