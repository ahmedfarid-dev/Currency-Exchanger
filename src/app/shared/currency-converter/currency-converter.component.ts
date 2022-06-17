import { Component, Input, OnInit } from '@angular/core';
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
  };
  @Input() detailsDisplay: boolean = false;

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

  swipeCurrencies(){
    if(!this.detailsDisplay){
      let fromCurrency = this.currencyExchangeState.fromCurrency;
      this.currencyExchangeState.fromCurrency = this.currencyExchangeState.toCurrency;
      this.currencyExchangeState.toCurrency = fromCurrency;
    }
  }

  convertAmount(){
    this.currencyExchangeService.convert(
      this.currencyExchangeState.amount,
      this.currencyExchangeState.fromCurrency.code,
      this.currencyExchangeState.toCurrency.code).subscribe({
      next: (data) => {
        this.convertedAmount = data.result;
        this.convertedAmountUnit = this.convertedAmount/this.currencyExchangeState.amount
      },
      error: (e) => console.error(e),
    });
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
