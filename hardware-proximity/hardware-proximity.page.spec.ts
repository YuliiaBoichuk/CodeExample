import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HardwareProximityPage } from './hardware-proximity.page';

describe('HardwareProximityPage', () => {
  let component: HardwareProximityPage;
  let fixture: ComponentFixture<HardwareProximityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardwareProximityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HardwareProximityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
