import { Color } from '../Color';
import { LineSymbol } from './LineSymbol';

export class SimpleLineSymbol extends LineSymbol {
  style: string;
  width: number;

  constructor(color: Color, width: number = 1, style: string = 'solid') {
    super(color, 'simple-line');
    this.style = style;
    this.width = width;
  }
}
