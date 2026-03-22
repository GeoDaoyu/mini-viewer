import { Color } from '../Color';
import { FillSymbol } from './FillSymbol';
import { SimpleLineSymbol } from './SimpleLineSymbol';

export class SimpleFillSymbol extends FillSymbol {
  style: string;
  outline: SimpleLineSymbol;

  constructor(color?: Color, style: string = 'solid', outline?: SimpleLineSymbol) {
    super(color || new Color([227, 139, 79, 0.8]), 'simple-fill');
    this.style = style;
    this.outline = outline || new SimpleLineSymbol(new Color([255, 255, 255, 1]), 1);
  }
}
