import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';
import {IonRouterOutlet, MenuController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-screen-sensor',
  templateUrl: './screen-sensor.page.html',
  styleUrls: ['./screen-sensor.page.scss'],
})
export class ScreenSensorPage implements OnInit {
  showTest: boolean;
  showCongrat: boolean;
  showCongratParam: object;
  rects: any[];
  keys: string[];
  hoverClass: any[];
  rectsFilled: any[];
  elementsCoord: any[];
  timerId: any;
  answer: boolean;
  prevTest: string;
  nextTest: string;
  isLastTest: boolean;

  constructor(
      private helperService: HelperService,
      private cd: ChangeDetectorRef,
      private router: Router,
      public menuCtrl: MenuController,
      private routerOutlet: IonRouterOutlet,
      private translateService: TranslateService,
  ) {
    this.showTest = false;
    this.showCongrat = false;
    this.showCongratParam = {};
    this.rects = [];
    this.hoverClass = [];
    this.rectsFilled = [];
    this.elementsCoord = [];
    this.answer = false;
    this.prevTest = this.helperService.getPrevTestPath(this.router.url);
    this.nextTest = this.helperService.getNextTestPath(this.router.url);
    this.isLastTest = this.helperService.isLastTest(this.router.url);
  }

  ngOnInit() {
    for (let i = 1; i <= 12 * 18; i++) {
      this.rects.push(i);
    }
    // this.keys = Object.keys(this.rects);
    this.keys = this.rects;
  }

  onStart() {
    this.showTest = true;
    this.cd.detectChanges();

    this.menuCtrl.enable(false);
    this.routerOutlet.swipeGesture = false;
  }

  onTouchStart() {
    if (this.elementsCoord.length === 0) {
      for (let i = 1; i <= this.rects.length; i++) {
        const elem = document.getElementById('rect' + i).getBoundingClientRect();
        this.elementsCoord.push([elem, i]);
        // console.log(this.elementsCoord);
      }
    }
    if (this.rectsFilled.length === 0) {
      this.timerId = setTimeout(() => {
        console.log('Time is up!');
        this.answer = false;
        this.checkAnswer();
      }, 30000);
    }
  }

  onTouchMove($event) {
    const touchX = $event.touches ? $event.touches[0].clientX : $event.clientX;
    const touchY = $event.touches ? $event.touches[0].clientY : $event.clientY;
    for (const el of this.elementsCoord) {
      // console.log(' (' + el[0] + ' <= ' + touchX + ' <= ' + el[2] + ') / (' + el[1] + ' <= ' + touchY + ' <= ' + el[3] + ') ' + el[4]);
      if ( ((touchX >= el[0].x) && (touchX <= el[0].x + el[0].width)) && ((touchY >= el[0].y) && (touchY <= el[0].y + el[0].height)) ) {
        this.fillRect(el[1]);
      }
    }
  }

  onClick(key) {
    this.fillRect(key);
  }

  fillRect(key) {
    const data = this.rectsFilled.find(ob => ob === key);
    if (!data) {
      this.rectsFilled.push(key);
      // console.log('pushed - ' + key);
      // console.log(this.rectsFilled);
    }
    this.hoverClass[key] = ' filled';
    // console.log(this.rects.length + ' / ' + this.rectsFilled.length + ' / ' + this.hoverClass);
    if (this.rects.length === this.rectsFilled.length) {
      this.answer = true;
      this.checkAnswer();
    }
  }

  onRepeat() {
    this.showCongrat = false;

    for (let i = 1; i <= 12 * 18; i++) {
      this.rects.push(i);
    }
    // this.keys = Object.keys(this.rects);
    this.keys = this.rects;

    this.cd.detectChanges();
  }

  checkAnswer() {
    if (this.answer) {
      console.log('Congratulations!');
      this.showCongratParam = {
        icon: 'checkmark-outline',
        iconClass: 'icon-passed',
        header: this.translateService.instant('TEST.GOOD_WORK'),
        text: this.translateService.instant('SCREEN_SENSOR_TEST.TITLE') + this.translateService.instant('TEST.SUCCESS'),
        nextTest: this.helperService.getNextTestPath(this.router.url),
      };
      this.helperService.setData('sensor', 2);
    } else {
      console.log('Bad answer!');
      this.showCongratParam = {
        icon: 'close-outline',
        iconClass: 'icon-fail',
        header: this.translateService.instant('TEST.SORRY'),
        text: this.translateService.instant('SCREEN_SENSOR_TEST.FAIL'),
        nextTest: this.helperService.getNextTestPath(this.router.url),
      };
      this.helperService.setData('sensor', 1);
    }

    // Back to screen
    this.showTest = false;
    this.showCongrat = true;

    // Cleaning filled rects
    this.answer = false;
    this.rects = [];
    this.hoverClass = [];
    this.rectsFilled = [];
    this.elementsCoord = [];
    clearTimeout(this.timerId);

    this.menuCtrl.enable(true);
    this.routerOutlet.swipeGesture = false;

    this.cd.detectChanges();
  }

}
