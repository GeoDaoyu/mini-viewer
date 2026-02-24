import { Color } from '../Color';
import { Symbol } from './Symbol';
import { SimpleLineSymbol } from './SimpleLineSymbol';

export class MarkerSymbol extends Symbol {
  style: string;
  outline: SimpleLineSymbol;
  size: string;

  constructor(color: Color, type: string, style: string = 'circle', outline?: SimpleLineSymbol, size: string = '8px') {
    super(color, type);
    this.style = style;
    this.outline = outline || new SimpleLineSymbol(new Color([0, 0, 0, 1]));
    this.size = size;
  }
}
