import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScreenSensorPage } from './screen-sensor.page';

describe('ScreenSensorPage', () => {
  let component: ScreenSensorPage;
  let fixture: ComponentFixture<ScreenSensorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenSensorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScreenSensorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
