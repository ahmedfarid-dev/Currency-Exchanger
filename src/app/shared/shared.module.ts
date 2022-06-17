import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';

@NgModule({
    declarations: [
        CurrencyConverterComponent
    ],

    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CurrencyConverterComponent
    ]
})
export class SharedModule
{
}
