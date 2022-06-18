import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [CurrencyConverterComponent],

  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyConverterComponent
  ]
})
export class SharedModule {}
