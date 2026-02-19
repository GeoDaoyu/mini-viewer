import { Color } from '../Color';
import { Symbol } from './Symbol';
import { SimpleLineSymbol } from './SimpleLineSymbol';

export class SimpleFillSymbol extends Symbol {
  style: string;
  outline: SimpleLineSymbol;

  constructor(color: Color, style: string = 'solid', outline?: SimpleLineSymbol) {
    super(color, 'simple-fill');
    this.style = style;
    this.outline = outline || new SimpleLineSymbol(new Color([0, 0, 0, 1]));
  }
}
