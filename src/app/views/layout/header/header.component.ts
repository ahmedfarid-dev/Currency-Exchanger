import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyExchangeState } from 'src/app/models/currencyExchangeState.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  moveToDetailsPage(fromCurrency:string,toCurrency:string){
    let currencyExchangeState: CurrencyExchangeState = {
      amount: 1,
      fromCurrency:{ code: "EUR", label:"Euro"},
      toCurrency:{ code: "USD", label:"United States Dollar"},
    };
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(
        ['details'],
        {
          state: {currencyExchangeState : currencyExchangeState},
        }
    ));

    
  }

}
