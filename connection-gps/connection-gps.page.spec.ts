import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConnectionGpsPage } from './connection-gps.page';

describe('ConnectionGpsPage', () => {
  let component: ConnectionGpsPage;
  let fixture: ComponentFixture<ConnectionGpsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionGpsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectionGpsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
