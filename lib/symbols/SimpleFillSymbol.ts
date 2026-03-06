import { Color } from '../Color';
import { FillSymbol } from './FillSymbol';
import { SimpleLineSymbol } from './SimpleLineSymbol';

export class SimpleFillSymbol extends FillSymbol {
  style: string;
  outline: SimpleLineSymbol;

  constructor(color?: Color, style: string = 'solid', outline?: SimpleLineSymbol) {
    super(color || new Color([0, 255, 0, 0.5]), 'simple-fill');
    this.style = style;
    this.outline = outline || new SimpleLineSymbol(new Color([0, 0, 0, 1]));
  }
}
