import { Currency } from "./symbol.model";

export interface CurrencyExchangeState {
    amount: number,
    fromCurrency:Currency,
    toCurrency:Currency,
    convertedAmount:number,
    convertedAmountUnit:number,
  }