import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { BaseComponent } from './base/base.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [
        BaseComponent,
        HeaderComponent,
        FooterComponent,
    ],
    imports     : [
        RouterModule,
        SharedModule
    ],
})
export class LayoutModule
{
}
