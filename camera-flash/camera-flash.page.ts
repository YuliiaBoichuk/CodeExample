import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-camera-flash',
  templateUrl: './camera-flash.page.html',
  styleUrls: ['./camera-flash.page.scss'],
})

export class CameraFlashPage implements OnInit {
  showTest: boolean;
  showCongrat: boolean;
  showEntAnsw: boolean;
  showCongratParam: object;
  camGranted: boolean;
  randNum: any[];
  keyBoard: any[];
  flashCounts: number;
  flashUsed: number;
  prevTest: string;
  nextTest: string;
  isLastTest: boolean;

  constructor(
      private helperService: HelperService,
      private cd: ChangeDetectorRef,
      private router: Router,
      private flashlight: Flashlight,
      private translateService: TranslateService,
  ) {
    this.showTest = false;
    this.showCongrat = false;
    this.showEntAnsw = false;
    this.showCongratParam = {};
    this.camGranted = false;
    this.randNum = [];
    this.keyBoard = [];
    this.flashCounts = 1;
    this.flashUsed = 0;
    this.prevTest = this.helperService.getPrevTestPath(this.router.url);
    this.nextTest = this.helperService.getNextTestPath(this.router.url);
    this.isLastTest = this.helperService.isLastTest(this.router.url);
  }

  ngOnInit() {
    for (let i = 1; i <= 9; i++) {
      this.keyBoard.push(i);
    }
    this.keyBoard.push(0);
    // this.keyBoard = Object.keys(this.keyBoard);

    this.helperService.getPermission('CAMERA').then( (perm) => {
      (perm) ? this.camGranted = true : this.camGranted = false;
    }).catch( (err) => {
      console.log(err);
      this.camGranted = false;
    });
  }

  onStart() {
    this.helperService.getPermission('CAMERA', false).then( (perm) => {
      if (perm) {

        this.showTest = true;
        this.cd.detectChanges();

        if (this.flashlight.available()) {

          this.randNum.push(this.helperService.getRandom(1, 9));
          console.log('rand num ', this.randNum);

          this.flashCounts = this.randNum[0] * 2;
          const flashTime = this.flashCounts * 500;

          if (this.flashlight.isSwitchedOn()) {
            this.flashlight.switchOff();
          }

          const timerToggle = setInterval(() => {
            if (this.flashUsed <= this.flashCounts - 1) {
              this.flashlight.toggle();
              this.flashUsed++;
            } else {
              this.flashlight.switchOff();
              clearInterval(timerToggle);
            }
          }, 500);

          setTimeout(() => {
            this.showEntAnsw = true;
            this.cd.detectChanges();
          }, flashTime);

        } else {
          console.error('Flash not allowed');
          this.onEnter(null);
        }

      } else {
        console.log('Camera not granted');
        this.onEnter(null);
      }
    }).catch( (err) => {
      console.log(err);
    });
  }

  onRepeat() {
    this.showCongrat = false;

    this.helperService.getPermission('CAMERA').then( (perm) => {
      (perm) ? this.camGranted = true : this.camGranted = false;
    }).catch( (err) => {
      console.log(err);
      this.camGranted = false;
    });

    this.cd.detectChanges();
  }

  onEnter(key) {
    if (this.randNum[0] === key) {
      console.log('Congratulations!');
      this.showCongratParam = {
        icon: 'checkmark-outline',
        iconClass: 'icon-passed',
        header: this.translateService.instant('TEST.GOOD_WORK'),
        text: this.translateService.instant('FLASH_TEST.TITLE') + this.translateService.instant('TEST.SUCCESS'),
        nextTest: this.helperService.getNextTestPath(this.router.url),
      };
      this.helperService.setData('flash', 2);
    } else {
      console.log('Bad answer!');
      this.showCongratParam = {
        icon: 'close-outline',
        iconClass: 'icon-fail',
        header: this.translateService.instant('TEST.SORRY'),
        text: this.translateService.instant('FLASH_TEST.FAIL'),
        nextTest: this.helperService.getNextTestPath(this.router.url),
      };
      this.helperService.setData('flash', 1);
    }
    // Back to screen
    this.showTest = false;
    this.showCongrat = true;
    this.showEntAnsw = false;

    // Cleaning answer
    this.randNum = [];
    this.flashCounts = 0;
    this.flashUsed = 0;

    this.cd.detectChanges();
  }
  public goToHomePage() {
    this.router.navigate(['/app/tabs/home']);
  }
}
