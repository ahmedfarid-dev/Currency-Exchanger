import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyExchangeState } from 'src/app/models/currencyExchangeState.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  preserveWhitespaces: true
})
export class DetailsComponent implements OnInit, OnChanges {
  
  currencyExchangeState : CurrencyExchangeState = {
    amount: 1,
    fromCurrency:{ code: "EUR", label:"Euro"},
    toCurrency:{ code: "USD", label:"United States Dollar"},
  }

  constructor(private router: Router) {
    if(this.router.getCurrentNavigation()?.extras?.state){
      this.currencyExchangeState = <CurrencyExchangeState>this.router.getCurrentNavigation()?.extras?.state?.['currencyExchangeState'];
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log(this.router.getCurrentNavigation()?.extras?.state?.['currencyExchangeState'])
  }
  
  ngOnInit(): void {
    
  }

  backToHomePage(){
    this.router.navigate(['home']);
  }

  

}
