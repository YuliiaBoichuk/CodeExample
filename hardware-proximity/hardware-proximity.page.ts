import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors/ngx';
import {TranslateService} from '@ngx-translate/core';

declare let proximity: any;

@Component({
  selector: 'app-hardware-proximity',
  templateUrl: './hardware-proximity.page.html',
  styleUrls: ['./hardware-proximity.page.scss'],
})
export class HardwareProximityPage implements OnInit {
  showTest: boolean;
  showCongrat: boolean;
  showCongratParam: object;
  answer: boolean;
  firstLevel: number;
  subscription: any;
  prevTest: string;
  nextTest: string;
  isLastTest: boolean;

  constructor(
      private helperService: HelperService,
      private cd: ChangeDetectorRef,
      private router: Router,
      private plt: Platform,
      private sensors: Sensors,
      private translateService: TranslateService,
  ) {
    this.showTest = false;
    this.showCongrat = false;
    this.showCongratParam = {};
    this.answer = false;
    this.prevTest = this.helperService.getPrevTestPath(this.router.url);
    this.nextTest = this.helperService.getNextTestPath(this.router.url);
    this.isLastTest = this.helperService.isLastTest(this.router.url);
  }

  ngOnInit() {
    this.plt.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      this.sensors.enableSensor('PROXIMITY');
    }).catch(err => console.log(err) );
  }

  onStart() {
    this.showTest = true;
    this.cd.detectChanges();

    let navProx: any;
    navProx = navigator;

    this.plt.ready().then((readySource) => {
      console.log('Platform ready from', readySource);

      this.sensors.getState().then( (status) => {
        if (status) {
          this.firstLevel = status[0];
          console.log('First level ', status[0]);
        }
      },
      (err) => {
        console.log('Unable to get Proximity info: ', err);
        this.onEnter();
        this.sensors.disableSensor();
      });


      setTimeout(() => {
        this.sensors.getState().then( (status) => {
          console.log('Answer from sensor', status[0]);
          if (status[0] === 0 && this.firstLevel > 0) {
              console.log('Proximity good');
              this.answer = true;
              this.onEnter();
              this.sensors.disableSensor();
          } else {
            console.log('Proximity error');
            this.onEnter();
            this.sensors.disableSensor();
          }
        },
        (err) => {
          console.log('Unable to get Proximity info: ', err);
          this.onEnter();
          this.sensors.disableSensor();
        });
      }, 5000);

    }).catch(err => console.log(err) );

  }

  onRepeat() {
    this.showCongrat = false;

    this.plt.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      this.sensors.enableSensor('PROXIMITY');
    }).catch(err => console.log(err) );

    this.cd.detectChanges();
  }

  onEnter() {

    if (this.answer) {
      console.log('Congratulations!' + this.answer);
      this.showCongratParam = {
        icon: 'checkmark-outline',
        iconClass: 'icon-passed',
        header: this.translateService.instant('TEST.GOOD_WORK'),
        text: this.translateService.instant('HARDWARE_PROXIMITY_TEST.TITLE') +
            this.translateService.instant('TEST.SUCCESS'),
        nextTest: this.helperService.getNextTestPath(this.router.url),
      };
      this.helperService.setData('proximity', 2);
    } else {
      console.log('Bad answer!');
      this.showCongratParam = {
        icon: 'close-outline',
        iconClass: 'icon-fail',
        header: this.translateService.instant('TEST.SORRY'),
        text: this.translateService.instant('HARDWARE_PROXIMITY_TEST.FAIL'),
        nextTest: this.helperService.getNextTestPath(this.router.url),
      };
      this.helperService.setData('proximity', 1);
    }

    // Back to screen
    this.showTest = false;
    this.showCongrat = true;

    // Cleaning answer
    this.answer = false;

    this.cd.detectChanges();
  }
  public goToHomePage() {
    this.router.navigate(['/app/tabs/home']);
  }
}
