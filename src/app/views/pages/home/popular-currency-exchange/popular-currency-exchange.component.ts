import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-popular-currency-exchange',
  templateUrl: './popular-currency-exchange.component.html',
  styleUrls: ['./popular-currency-exchange.component.scss'],
  preserveWhitespaces: true
})
export class PopularCurrencyExchangeComponent implements OnChanges {

  @Input() toAmount: number = 1;
  @Input() toCurrency:string = "USD"


  constructor() {
  
  }
  
  ngOnChanges(changes: SimpleChanges): void {

  }

}
