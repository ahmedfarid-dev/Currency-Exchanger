import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Currency } from 'src/app/models/symbol.model';
import { CurrencyExchangeService } from 'src/app/services/currency-exchange.service';
import { CurrencyExchangeState } from 'src/app/models/currencyExchangeState.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  @Input() currencyExchangeState: CurrencyExchangeState = {
    amount: 1,
    fromCurrency: { code: 'EUR', label: 'Euro' },
    toCurrency: { code: 'USD', label: 'United States Dollar' },
    convertedAmount: 0,
    convertedAmountUnit: 0
  };

  @Input() detailsDisplay: boolean = false;

  @Output() convertAmountEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeInputsEvent: EventEmitter<any> = new EventEmitter<any>();

  currencies: Currency[] = [];
  convertedAmount: any;
  convertedAmountUnit: any;

  constructor(
    private router: Router,
    private currencyExchangeService: CurrencyExchangeService
  ) {}

  ngOnInit(): void {
    this.currencyExchangeService.getSymbols().subscribe({
      next: (data) => {
        for (const symbol in data.symbols) {
          this.currencies.push({
            code: symbol,
            label: data.symbols[symbol]
          });
        }
      },
      error: (e) => console.error(e)
    });
  }

  compareCurrencies(item: any, selected: any) {
    return item?.code === selected?.code;
  }

  resetConvertedAmount() {
    this.currencyExchangeState.convertedAmount = 0;
    this.currencyExchangeState.convertedAmountUnit = 0;
    this.changeInputsEvent.emit({});
  }

  swipeCurrencies() {
    if (!this.detailsDisplay) {
      let fromCurrency = this.currencyExchangeState.fromCurrency;
      this.currencyExchangeState.fromCurrency =
        this.currencyExchangeState.toCurrency;
      this.currencyExchangeState.toCurrency = fromCurrency;
      this.convertAmountEvent.emit({});
    }
  }

  convertAmount() {
    this.convertAmountEvent.emit({});
  }

  moveToDetailsPage() {
    this.router.navigate(['details'], {
      state: { currencyExchangeState: this.currencyExchangeState }
    });
  }
}
