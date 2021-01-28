import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { BatteryStatus } from '@ionic-native/battery-status/ngx';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-hardware-charger',
  templateUrl: './hardware-charger.page.html',
  styleUrls: ['./hardware-charger.page.scss'],
})
export class HardwareChargerPage implements OnInit {
  showTest: boolean;
  showCongrat: boolean;
  showCongratParam: object;
  answer: boolean;
  firstLevel: number;
  timer: any;
  subscription: any;
  prevTest: string;
  nextTest: string;
  isLastTest: boolean;

  constructor(
      private helperService: HelperService,
      private cd: ChangeDetectorRef,
      private router: Router,
      private plt: Platform,
      private batteryStatus: BatteryStatus,
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
  }

  onStart() {
    this.showTest = true;
    this.cd.detectChanges();

    this.plt.ready().then((readySource) => {
      console.log('Platform ready from', readySource);

      this.timer = setTimeout(() => {
        this.answer = true;
        this.onEnter();
        this.subscription.unsubscribe();
      }, 30 * 1000);

      this.subscription = this.batteryStatus.onChange().subscribe(status => {

        console.log(status.level , status.isPlugged);
        if (!this.firstLevel) {
          this.firstLevel = status.level;
        }

        if (status.isPlugged && status.level < 100) {
          console.log('Start analyze buttery charging');

          if (status.level > this.firstLevel) {
            console.log('Charging good');
            this.answer = true;
            this.onEnter();
            clearTimeout(this.timer);
            this.subscription.unsubscribe();
          }

          this.timer = setTimeout(() => {
            this.onEnter();
            this.subscription.unsubscribe();
          }, 4 * 60 * 1000);

        } else {
          console.log('Charging error');
          this.onEnter();
          clearTimeout(this.timer);
          this.subscription.unsubscribe();
        }

      },
      (err) => {
        console.log('Unable to get Charger info: ', err);
        this.onEnter();
        clearTimeout(this.timer);
        this.subscription.unsubscribe();
      });

    }).catch(err => console.log(err) );

  }

  onRepeat() {
    this.showCongrat = false;
    this.cd.detectChanges();
  }

  onEnter() {

    if (this.answer) {
      console.log('Congratulations!' + this.answer);
      this.showCongratParam = {
        icon: 'checkmark-outline',
        iconClass: 'icon-passed',
        header: this.translateService.instant('TEST.GOOD_WORK'),
        text: this.translateService.instant('HARDWARE_CHARGER_TEST.TITLE') +
            this.translateService.instant('TEST.SUCCESS'),
        nextTest: this.helperService.getNextTestPath(this.router.url),
      };
      this.helperService.setData('charger', 2);
    } else {
      console.log('Bad answer!');
      this.showCongratParam = {
        icon: 'close-outline',
        iconClass: 'icon-fail',
        header: this.translateService.instant('TEST.SORRY'),
        text: this.translateService.instant('HARDWARE_CHARGER_TEST.FAIL'),
        nextTest: this.helperService.getNextTestPath(this.router.url),
      };
      this.helperService.setData('charger', 1);
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
