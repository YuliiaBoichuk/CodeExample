import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-hardware-fingerprint',
  templateUrl: './hardware-fingerprint.page.html',
  styleUrls: ['./hardware-fingerprint.page.scss'],
})
export class HardwareFingerprintPage implements OnInit {
  showTest: boolean;
  showCongrat: boolean;
  showCongratParam: object;
  answer: boolean;
  subscription: any;
  prevTest: string;
  nextTest: string;
  isLastTest: boolean;

  constructor(
      private helperService: HelperService,
      private cd: ChangeDetectorRef,
      private router: Router,
      private plt: Platform,
      private faio: FingerprintAIO,
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

      this.faio.isAvailable().then((res: any) => {

            console.log('Fingerprint available', res);
            this.faio.show({
              // title: '',
              // subtitle: '',
              description: 'Authenticate',
              disableBackup: true,  // Only for Android(optional)
            })
            .then((result: any) => {
              console.log(result);

              if (result) {
                console.log('Authentication successful');
                this.answer = true;
                this.onEnter();
              } else {
                console.log('Authentication invalid');
                this.onEnter();
              }

            })
            .catch((error: any) => {
              console.log('Authentication invalid: ', error);
              this.onEnter();
            });

      })
      .catch((error: any) => {
        console.error(error);
        this.onEnter();
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
        text: this.translateService.instant('HARDWARE_FINGERPRINT_TEST.TITLE') +
            this.translateService.instant('TEST.SUCCESS'),
        nextTest: this.helperService.getNextTestPath(this.router.url),
      };
      this.helperService.setData('fingerprint', 2);
    } else {
      console.log('Bad answer!');
      this.showCongratParam = {
        icon: 'close-outline',
        iconClass: 'icon-fail',
        header: this.translateService.instant('TEST.SORRY'),
        text: this.translateService.instant('HARDWARE_FINGERPRINT_TEST.FAIL'),
        nextTest: this.helperService.getNextTestPath(this.router.url),
      };
      this.helperService.setData('fingerprint', 1);
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
