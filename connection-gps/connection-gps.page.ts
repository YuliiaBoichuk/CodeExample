import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-connection-gps',
  templateUrl: './connection-gps.page.html',
  styleUrls: ['./connection-gps.page.scss'],
})
export class ConnectionGpsPage implements OnInit {
  showTest: boolean;
  showCongrat: boolean;
  showCongratParam: object;
  gpsGranted: boolean;
  showWorning: boolean;
  answer: boolean;
  prevTest: string;
  nextTest: string;
  isLastTest: boolean;

  constructor(
      private helperService: HelperService,
      private cd: ChangeDetectorRef,
      private router: Router,
      private plt: Platform,
      private locationAccuracy: LocationAccuracy,
      private geolocation: Geolocation,
      private translateService: TranslateService,
  ) {
    this.showTest = false;
    this.showCongrat = false;
    this.showCongratParam = {};
    this.gpsGranted = false;
    this.showWorning = false;
    this.answer = false;
    this.prevTest = this.helperService.getPrevTestPath(this.router.url);
    this.nextTest = this.helperService.getNextTestPath(this.router.url);
    this.isLastTest = this.helperService.isLastTest(this.router.url);
  }

  ngOnInit() {
      this.helperService.getPermission('LOCATION').then( (perm) => {
          (perm) ? this.gpsGranted = true : this.gpsGranted = false;
      }).catch( (err) => {
          console.log(err);
          this.gpsGranted = false;
      });
  }

  onStart() {
      this.helperService.getPermission('LOCATION', false).then( (perm) => {
          if (perm) {

              this.plt.ready().then((readySource) => {
                  console.log('Platform ready from', readySource);

                  this.locationAccuracy.canRequest().then((canRequest: boolean) => {
                          if (canRequest || this.plt.is('ios')) {
                              this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                                  () => {
                                      console.log('Request successful');
                                      this.showTest = true;
                                      this.showWorning = false;
                                      this.cd.detectChanges();

                                      this.geolocation.getCurrentPosition().then((resp) => {
                                          console.log('GPS scan ');
                                          if (resp.coords.latitude && resp.coords.longitude) {
                                              console.log(resp.coords.latitude, resp.coords.longitude);
                                              this.answer = true;
                                              this.onEnter();
                                          } else {
                                              console.log('GPS error');
                                              this.answer = false;
                                              this.onEnter();
                                          }
                                      }).catch((error) => {
                                          console.log('GPS error: Error getting location', error);
                                          this.answer = false;
                                          this.onEnter();
                                      });

                                      // const watch = this.geolocation.watchPosition();
                                      // watch.subscribe((data) => {
                                      //   // data can be a set of coordinates, or an error (if an error occurred).
                                      //   console.log(data.coords.latitude, data.coords.longitude);
                                      // });

                                  },
                                  error => {
                                      console.log('Error requesting location permissions', error);
                                      this.gpsGranted = false;
                                      this.showWorning = true;
                                      this.answer = false;
                                      this.onEnter();
                                  }
                              );

                          } else {
                              this.gpsGranted = false;
                              this.showWorning = true;
                              this.answer = false;
                              this.onEnter();
                          }
                      },
                      (err) => {
                          console.log('Unable to get location info: ', err);
                          this.answer = false;
                          this.onEnter();
                      });

              }).catch(err => console.log(err) );

          } else {
              console.log('GPS not granted');
              this.answer = false;
              this.onEnter();
          }
      }).catch( (err) => {
          console.log(err);
      });
  }

  toSettings() {
    this.showWorning = false;
  }

  onRepeat() {
      this.showCongrat = false;

      this.helperService.getPermission('LOCATION').then( (perm) => {
          (perm) ? this.gpsGranted = true : this.gpsGranted = false;
      }).catch( (err) => {
          console.log(err);
          this.gpsGranted = false;
      });

      this.cd.detectChanges();
  }

  onEnter() {

    if (this.answer) {
      console.log('Congratulations!' + this.answer);
      this.showCongratParam = {
        icon: 'checkmark-outline',
        iconClass: 'icon-passed',
        header: this.translateService.instant('TEST.GOOD_WORK'),
        text: this.translateService.instant('GPS_TEST.TITLE') +
              this.translateService.instant('TEST.SUCCESS'),
        nextTest: this.helperService.getNextTestPath(this.router.url),
      };
      this.helperService.setData('gps', 2);
    } else {
      console.log('Bad answer!');
      this.showCongratParam = {
        icon: 'close-outline',
        iconClass: 'icon-fail',
        header: this.translateService.instant('TEST.SORRY'),
        text: this.translateService.instant('GPS_TEST.FAIL'),
        nextTest: this.helperService.getNextTestPath(this.router.url),
      };
      this.helperService.setData('gps', 1);
    }

    // Back to screen
    this.showTest = false;
    this.showCongrat = true;
    this.showWorning = false;

    // Cleaning answer
    this.answer = false;

    this.cd.detectChanges();
  }
    public goToHomePage() {
        this.router.navigate(['/app/tabs/home']);
    }
}
