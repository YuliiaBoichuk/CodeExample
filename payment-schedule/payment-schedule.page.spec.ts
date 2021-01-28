import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaymentSchedulePage } from './payment-schedule.page';

describe('PaymentSchedulePage', () => {
  let component: PaymentSchedulePage;
  let fixture: ComponentFixture<PaymentSchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentSchedulePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
