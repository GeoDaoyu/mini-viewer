import { Color } from '../Color';
import { LineSymbol } from './LineSymbol';

export class SimpleLineSymbol extends LineSymbol {
  style: string;
  width: number;

  constructor(color?: Color, width: number = 1, style: string = 'solid') {
    super(color || new Color([227, 139, 79, 1]), 'simple-line');
    this.style = style;
    this.width = width;
  }
}
