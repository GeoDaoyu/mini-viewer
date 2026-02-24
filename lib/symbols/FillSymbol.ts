import { Color } from '../Color';
import { Symbol } from './Symbol';
import { SimpleLineSymbol } from './SimpleLineSymbol';

export class FillSymbol extends Symbol {
  style: string;
  outline: SimpleLineSymbol;

  constructor(color: Color, type: string, style: string = 'solid', outline?: SimpleLineSymbol) {
    super(color, type);
    this.style = style;
    this.outline = outline || new SimpleLineSymbol(new Color([0, 0, 0, 1]));
  }
}
