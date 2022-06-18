import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent
} from 'ng-apexcharts';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { CurrencyExchangeService } from 'src/app/services/currency-exchange.service';
import { CurrencyExchangeState } from 'src/app/models/currencyExchangeState.model';
import { Router } from '@angular/router';

export type apexChartOptions = {
  series: ApexAxisChartSeries;
  nonAxisSeries: ApexNonAxisChartSeries;
  colors: string[];
  grid: ApexGrid;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  markers: ApexMarkers;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  tooltip: ApexTooltip;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  labels: string[];
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  preserveWhitespaces: true
})
export class DetailsComponent implements OnInit {
  @ViewChild('historicalRatesChart', { static: false }) historicalRatesChart:
    | ChartComponent
    | undefined;

  public historicalRatesChartOptions: Partial<apexChartOptions> | any;

  currencyExchangeState: CurrencyExchangeState = {
    amount: 1,
    fromCurrency: { code: 'EUR', label: 'Euro' },
    toCurrency: { code: 'USD', label: 'United States Dollar' },
    convertedAmount: 0,
    convertedAmountUnit: 0
  };

  constructor(
    private router: Router,
    private currencyExchangeService: CurrencyExchangeService
  ) {
    if (this.router.getCurrentNavigation()?.extras?.state) {
      this.currencyExchangeState = <CurrencyExchangeState>(
        this.router.getCurrentNavigation()?.extras?.state?.[
          'currencyExchangeState'
        ]
      );
    }

    this.historicalRatesChartOptions = {
      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: true
        }
      },
      series: [
        {
          data: []
        }
      ],
      stroke: {
        width: 2,
        curve: 'straight'
      },
      markers: {
        size: 0
      },
      grid: {
        borderColor: 'rgba(77, 138, 240, .1)',
        padding: {
          bottom: -10
        }
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: '#686868',
            fontSize: '13px',
            fontFamily: 'Overpass, sans-serif',
            fontWeight: 400
          }
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#686868',
            fontSize: '11px',
            fontFamily: 'Overpass, sans-serif',
            fontWeight: 400
          }
        }
      },
      colors: ['#a12134']
    };
  }

  ngOnInit(): void {
    if (this.currencyExchangeState.convertedAmount === 0) {
      this.convertAmount();
    }
    this.updateHistoricalRatesChart();
  }

  backToHomePage() {
    this.router.navigate(['home']);
  }

  convertAmount() {
    this.currencyExchangeService
      .convert(
        this.currencyExchangeState.amount,
        this.currencyExchangeState.fromCurrency.code,
        this.currencyExchangeState.toCurrency.code
      )
      .subscribe({
        next: (data) => {
          this.currencyExchangeState.convertedAmount = data.result;
          this.currencyExchangeState.convertedAmountUnit =
            this.currencyExchangeState.convertedAmount /
            this.currencyExchangeState.amount;
        },
        error: (e) => console.error(e)
      });
  }

  resetHistoricalRatesChart() {
    this.historicalRatesChart?.updateSeries([
      {
        name: 'historicalRatesChart',
        data: []
      }
    ]);
  }

  updateHistoricalRatesChart() {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    let historicalMonthsRates: { month: string; date: string; rate: number }[] =
      [];
    let d = new Date();
    for (let i = 0; i <= 11; i++) {
      d.setMonth(d.getMonth());
      d.setDate(0);
      historicalMonthsRates.push({
        month: `${monthNames[d.getMonth()]}-${d.getFullYear()}`,
        date: d.toISOString().split('T')[0],
        rate: 0
      });
    }

    let observableBatch: Observable<any>[] = [];

    historicalMonthsRates.forEach((historicalMonthsRate) => {
      observableBatch.push(
        this.currencyExchangeService.getHistoricalRate(
          historicalMonthsRate.date,
          this.currencyExchangeState.fromCurrency.code,
          this.currencyExchangeState.toCurrency.code
        )
      );
    });

    forkJoin(observableBatch).subscribe((results: any[]) => {
      historicalMonthsRates.forEach((historicalMonthsRate, i) => {
        historicalMonthsRate.rate =
          results[i].rates[this.currencyExchangeState.toCurrency.code];
      });

      this.historicalRatesChart?.updateSeries([
        {
          name: 'historicalRatesChart',
          data: historicalMonthsRates.map((historicalMonthsRate) => {
            return {
              y: historicalMonthsRate.rate,
              x: historicalMonthsRate.month
            };
          })
        }
      ]);
    });
  }
}
