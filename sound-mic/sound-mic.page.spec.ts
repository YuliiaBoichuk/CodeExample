import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SoundMicPage } from './sound-mic.page';

describe('SoundMicPage', () => {
  let component: SoundMicPage;
  let fixture: ComponentFixture<SoundMicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoundMicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SoundMicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
