import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SensorGyroscopePage } from './sensor-gyroscope.page';

describe('SensorGyroscopePage', () => {
  let component: SensorGyroscopePage;
  let fixture: ComponentFixture<SensorGyroscopePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorGyroscopePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SensorGyroscopePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
