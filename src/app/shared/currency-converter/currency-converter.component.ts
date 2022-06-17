import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyExchangeState } from 'src/app/models/currencyExchangeState.model';
import { Currency } from 'src/app/models/symbol.model';
import { CurrencyExchangeService } from 'src/app/services/currency-exchange.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {

  @Input() currencyExchangeState: CurrencyExchangeState = {
    amount: 1,
    fromCurrency:{ code: "EUR", label:"Euro"},
    toCurrency:{ code: "USD", label:"United States Dollar"},
    convertedAmount:0,
    convertedAmountUnit:0
  };

  @Input() detailsDisplay: boolean = false;

  @Output() onConvertAmountEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChangeInputsEvent : EventEmitter<any> = new EventEmitter<any>();

  currencies: Currency[] = [];
  convertedAmount:any;
  convertedAmountUnit:any;


  constructor(private router: Router,private currencyExchangeService: CurrencyExchangeService) { }

  ngOnInit(): void {

    this.currencyExchangeService.getSymbols().subscribe({
      next: (data) => {
        for (const symbol in data.symbols) {
          this.currencies.push({
            code: symbol,
            label: data.symbols[symbol]
          })
        }
      },
      error: (e) => console.error(e),
    });

  }

  compareCurrencies(item:any, selected:any) {
    return item?.code === selected?.code;
  }

  resetConvertedAmount(){
    this.currencyExchangeState.convertedAmount =0;
    this.currencyExchangeState.convertedAmountUnit =0;
    this.onChangeInputsEvent.emit({});
  }

  swipeCurrencies(){
    if(!this.detailsDisplay){
      let fromCurrency = this.currencyExchangeState.fromCurrency;
      this.currencyExchangeState.fromCurrency = this.currencyExchangeState.toCurrency;
      this.currencyExchangeState.toCurrency = fromCurrency;
      this.onConvertAmountEvent.emit({});
    }
  }

  convertAmount(){
    this.onConvertAmountEvent.emit({});
  }

  moveToDetailsPage(){
    this.router.navigate(
      ['details'],
      {
        state: {currencyExchangeState : this.currencyExchangeState},
      }
    );
  }

}
