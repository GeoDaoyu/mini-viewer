import { Color } from '../Color';
import { Symbol } from './Symbol';

export class SimpleLineSymbol extends Symbol {
  style: string;
  width: number;

  constructor(color: Color, width: number = 1, style: string = 'solid') {
    super(color, 'simple-line');
    this.style = style;
    this.width = width;
  }
}
