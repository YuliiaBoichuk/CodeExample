import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CameraFlashPage } from './camera-flash.page';

describe('CameraFlashPage', () => {
  let component: CameraFlashPage;
  let fixture: ComponentFixture<CameraFlashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraFlashPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CameraFlashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
