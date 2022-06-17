import { Component, OnInit } from '@angular/core';
import { CurrencyExchangeState } from 'src/app/models/currencyExchangeState.model';

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
  }

  popularCurrencies:any[] = [];

  constructor() {
    this.popularCurrencies = [
      "USD","EUR","JPY","GBP","AUD","CAD","CHF","CNH","HKD"
    ].map((popularCurrency)=>{
      return {
        toAmount:1,
        toCurrency:popularCurrency
      }
    })
  }
  
  ngOnInit(): void {
    
  }

  updatePopularCurrencies(){
    let observableBatch = [];

    this.popularCurrencies.forEach((popularCurrency) => {
      //observableBatch.push(this.http.get(url+key).map((res) => res.json()));
    });

    //Observable.forkJoin(observableBatch).subscribe(results => {
      // results[0] is our character
      // results[1] is our character homeworld
      // results[0].homeworld = results[1];
      // this.loadedCharacter = results[0];
    //});

  }
}
