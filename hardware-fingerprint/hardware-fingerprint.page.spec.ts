import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HardwareFingerprintPage } from './hardware-fingerprint.page';

describe('HardwareFingerprintPage', () => {
  let component: HardwareFingerprintPage;
  let fixture: ComponentFixture<HardwareFingerprintPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardwareFingerprintPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HardwareFingerprintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
