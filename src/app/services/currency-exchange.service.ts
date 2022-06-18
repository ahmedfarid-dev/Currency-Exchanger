import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { constants } from '../constants';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeService {
  constructor(private http: HttpClient) {}

  getSymbols() {
    const url = `${environment.baseURL}${constants.API.GET_SYMBOLS_API}`;

    let headers = new HttpHeaders({
      apiKey: environment.apiKey
    });
    let options = { headers: headers };
    return this.http.get(url, options).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((errorRes) => {
        return throwError(errorRes);
      })
    );
  }

  convert(amount: number, from: string, to: string) {
    const url = `${environment.baseURL}${constants.API.CONVERT_API}?from=${from}&to=${to}&amount=${amount}`;

    let headers = new HttpHeaders({
      apiKey: environment.apiKey
    });
    let options = { headers: headers };
    return this.http.get(url, options).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((errorRes) => {
        return throwError(errorRes);
      })
    );
  }

  getHistoricalRate(date: string, base: string, symbol: string) {
    const url = `${environment.baseURL}${constants.API.GET_HISTORICAL_RATE}${date}?base =${base}&symbols=${symbol}`;

    let headers = new HttpHeaders({
      apiKey: environment.apiKey
    });
    let options = { headers: headers };
    return this.http.get(url, options).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((errorRes) => {
        return throwError(errorRes);
      })
    );
  }
}
