import { Renderer } from './Renderer';
import { SimpleMarkerSymbol } from '@/symbols/SimpleMarkerSymbol';
import { SimpleLineSymbol } from '@/symbols/SimpleLineSymbol';
import { SimpleFillSymbol } from '@/symbols/SimpleFillSymbol';

export class SimpleRenderer extends Renderer {
  symbol: SimpleMarkerSymbol | SimpleLineSymbol | SimpleFillSymbol;

  constructor(symbol: SimpleMarkerSymbol | SimpleLineSymbol | SimpleFillSymbol) {
    super('simple');
    this.symbol = symbol;
  }
}
