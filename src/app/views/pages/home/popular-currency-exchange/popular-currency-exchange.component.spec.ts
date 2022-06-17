import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCurrencyExchangeComponent } from './popular-currency-exchange.component';

describe('PopularCurrencyExchangeComponent', () => {
  let component: PopularCurrencyExchangeComponent;
  let fixture: ComponentFixture<PopularCurrencyExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularCurrencyExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularCurrencyExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
