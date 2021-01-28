import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HardwareChargerPage } from './hardware-charger.page';

describe('HardwareChargerPage', () => {
  let component: HardwareChargerPage;
  let fixture: ComponentFixture<HardwareChargerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardwareChargerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HardwareChargerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
