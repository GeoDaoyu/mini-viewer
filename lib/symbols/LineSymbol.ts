import { Color } from '../Color';
import { Symbol } from './Symbol';

export class LineSymbol extends Symbol {
  style: string;
  width: number;

  constructor(color: Color, type: string, width: number = 1, style: string = 'solid') {
    super(color, type);
    this.style = style;
    this.width = width;
  }
}
