import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { CurrencyExchangeState } from 'src/app/models/currencyExchangeState.model';
import { CurrencyExchangeService } from 'src/app/services/currency-exchange.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  preserveWhitespaces: true
})
export class HomeComponent implements OnInit {

  currencyExchangeState : CurrencyExchangeState =  {
    amount: 1,
    fromCurrency:{ code: "EUR", label:"Euro"},
    toCurrency:{ code: "USD", label:"United States Dollar"},
    convertedAmount:0,
    convertedAmountUnit:0
  }
  popularCurrencies:any[] = [];

  constructor(private currencyExchangeService: CurrencyExchangeService) {
    this.popularCurrencies = [
      "USD","EUR","JPY","GBP","AUD","CAD","CHF","CNH","HKD"
    ].map((popularCurrency)=>{
      return {
        toCurrency:popularCurrency,
        convertedAmount:0,
      }
    })
  }
  
  ngOnInit(): void {
    this.convertAmount();
  }

  convertAmount(){
    this.currencyExchangeService.convert(
      this.currencyExchangeState.amount,
      this.currencyExchangeState.fromCurrency.code,
      this.currencyExchangeState.toCurrency.code).subscribe({
      next: (data) => {
        this.currencyExchangeState.convertedAmount = data.result;
        this.currencyExchangeState.convertedAmountUnit = this.currencyExchangeState.convertedAmount/this.currencyExchangeState.amount;
      },
      error: (e) => console.error(e),
    });

    this.updatePopularCurrencies();
  }

  resetPopularCurrencies(){
    this.popularCurrencies.forEach((popularCurrency, i) => {
      popularCurrency.convertedAmount = 0;
    });
  }

  updatePopularCurrencies(){
    let observableBatch: Observable<any>[] = [];

    this.popularCurrencies.forEach((popularCurrency) => {
      observableBatch.push(this.currencyExchangeService.convert(
        this.currencyExchangeState.amount,
        this.currencyExchangeState.fromCurrency.code,
        popularCurrency.toCurrency));
    });

    forkJoin(observableBatch).subscribe((results: any[]) => {
      this.popularCurrencies.forEach((popularCurrency, i) => {
        popularCurrency.convertedAmount = results[i].result;
      });
    });
  }
}
