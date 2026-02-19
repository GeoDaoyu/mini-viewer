import { Color } from '../Color';
import { Symbol } from './Symbol';

export class SimpleLineSymbol extends Symbol {
  style: string;

  constructor(color: Color, style: string = 'solid') {
    super(color, 'simple-line');
    this.style = style;
  }
}
