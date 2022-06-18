import { Component } from '@angular/core';
import { CurrencyExchangeState } from 'src/app/models/currencyExchangeState.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  moveToDetailsPage(fromCurrency: string, toCurrency: string) {
    let currencyExchangeState: CurrencyExchangeState = {
      amount: 1,
      fromCurrency: { code: fromCurrency, label: 'Euro' },
      toCurrency: { code: toCurrency, label: '' },
      convertedAmount: 0,
      convertedAmountUnit: 0
    };
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['details'], {
        state: { currencyExchangeState: currencyExchangeState }
      })
    );
  }
}
