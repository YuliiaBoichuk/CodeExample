import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-sensor-gyroscope',
  templateUrl: './sensor-gyroscope.page.html',
  styleUrls: ['./sensor-gyroscope.page.scss'],
})
export class SensorGyroscopePage implements OnInit {
  showTest: boolean;
  showCongrat: boolean;
  showCongratParam: object;
  gyrCurrent: any[];
  gyrWatch: any[];
  prevTest: string;
  nextTest: string;
  isLastTest: boolean;

  constructor(
      private helperService: HelperService,
      private cd: ChangeDetectorRef,
      private router: Router,
      private gyroscope: Gyroscope,
      private translateService: TranslateService,
  ) {
    this.showTest = false;
    this.showCongrat = false;
    this.showCongratParam = {};
    this.gyrCurrent = [];
    this.gyrWatch = [];
    this.prevTest = this.helperService.getPrevTestPath(this.router.url);
    this.nextTest = this.helperService.getNextTestPath(this.router.url);
    this.isLastTest = this.helperService.isLastTest(this.router.url);
  }

  ngOnInit() {
  }

  onStart() {

      this.showTest = true;
      this.cd.detectChanges();

      setTimeout(() => {
        // Start listening process
        console.log('Checking...');
        const options: GyroscopeOptions = {
          frequency: 1000
        };
        // Get primary data
        this.gyroscope.getCurrent(options)
            .then((orientation: GyroscopeOrientation) => {
              this.gyrCurrent.push(orientation.x, orientation.y, orientation.z, orientation.timestamp);
              console.log('gyrCurrent');
              console.log(this.gyrCurrent);
            })
            .catch();

        /*this.gyroscope.watch()
            .subscribe((orientation: GyroscopeOrientation) => {
              if (this.gyrWatch.length <= 3) {
                this.gyrWatch.push([orientation.x, orientation.y, orientation.z, orientation.timestamp]);
                console.log('gyrWatch');
                console.log(this.gyrWatch);
              }
            });*/

        // Getting data for the period
        const timerId = setInterval(() => {
          this.gyroscope.getCurrent(options)
              .then((orientation: GyroscopeOrientation) => {
                this.gyrWatch.push([orientation.x, orientation.y, orientation.z, orientation.timestamp]);
                console.log('gyrWatch');
                console.log(this.gyrWatch);
              })
              .catch();
        }, 1000);
        setTimeout(() => { clearInterval(timerId); this.onEnter(); }, 3000);

      }, 500);

  }

  onRepeat() {
    this.showCongrat = false;
    this.cd.detectChanges();
  }

  onEnter() {
    let answer = false;

    // Determination of the largest deviations
    const finGyrWatch = [0, 0, 0, 0];
    this.gyrWatch.map((item, index) => {
      item.map((itm, ind) => {
        if ((index > 0) && (Math.abs(+itm) > Math.abs(finGyrWatch[ind])) ) {
          finGyrWatch[ind] = +itm;
        }
      });
    });
    console.log(finGyrWatch);

    // Comparison of deviations with primary data
    this.gyrCurrent.map((item, index) => {
      if ( (index < 3) && Math.abs(Math.abs(+finGyrWatch[index]) - Math.abs(+item)) >= 3 ) {
        answer = true;
      }
    });

    if (answer) {
      console.log('Congratulations!' + answer);
      this.showCongratParam = {
        icon: 'checkmark-outline',
        iconClass: 'icon-passed',
        header: this.translateService.instant('TEST.GOOD_WORK'),
        text: this.translateService.instant('GYROSCOPE_TEST.TITLE') +
            this.translateService.instant('TEST.SUCCESS'),
        nextTest: this.helperService.getNextTestPath(this.router.url),
      };
      this.helperService.setData('gyroscope', 2);
    } else {
      console.log('Bad answer!');
      this.showCongratParam = {
        icon: 'close-outline',
        iconClass: 'icon-fail',
        header: this.translateService.instant('TEST.SORRY'),
        text: this.translateService.instant('GYROSCOPE_TEST.FAIL'),
        nextTest: this.helperService.getNextTestPath(this.router.url),
      };
      this.helperService.setData('gyroscope', 1);
    }

    // Back to screen
    this.showTest = false;
    this.showCongrat = true;

    // Cleaning answer
    this.gyrCurrent = [];
    this.gyrWatch = [];

    this.cd.detectChanges();
  }
  public goToHomePage() {
    this.router.navigate(['/app/tabs/home']);
  }
}
