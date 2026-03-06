import { Color } from '../Color';
import { MarkerSymbol } from './MarkerSymbol';
import { SimpleLineSymbol } from './SimpleLineSymbol';

export class SimpleMarkerSymbol extends MarkerSymbol {
  style: string;
  outline: SimpleLineSymbol;
  size: string;

  constructor(color?: Color, style: string = 'circle', outline?: SimpleLineSymbol, size: string = '8px') {
    super(color || new Color([255, 0, 0, 1]), 'simple-marker');
    this.style = style;
    this.outline = outline || new SimpleLineSymbol(new Color([0, 0, 0, 1]));
    this.size = size;
  }
}
