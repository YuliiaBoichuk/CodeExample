import {Component, NgZone} from '@angular/core';
import {Platform, NavController, Config} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateService } from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from './app.global';
import {Deeplinks} from '@ionic-native/deeplinks/ngx';
import {PaymentsPage} from './pages/payments/payments.page';
import {split} from 'ts-node';
import {HelperService} from './services/helper.service';
import {ClarificationPage} from './pages/clarification/clarification.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
    isForWeb = false;

  constructor(
    private router: Router,
    private platform: Platform,
    protected navController: NavController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    public global: AppState,
    public deeplinks: Deeplinks,
    private helperService: HelperService,
    public config: Config,
    public zone: NgZone
  ) {
    if (this.helperService.isForWeb()) {
      this.isForWeb = true;
    }
    this.initializeApp();
  }

  initializeApp() {
      const authToken = localStorage.getItem('user.AuthToken') || false;
      if (!authToken) {
          this.router.navigate(['login']);
      }
      this.translate.setDefaultLang('ru');
      this.translate.addLangs(['ru', 'en', 'kk', 'tr']);
      if (this.isForWeb) {
          const lang = this.helperService.getParamValueQueryString('lang');
          if (lang) {
              this.translate.use(lang);
          } else {
              this.translate.use(this.translate.getBrowserLang());
          }
      } else {
          if (localStorage.getItem('lang')) {
              this.translate.use(localStorage.getItem('lang'));
          } else {
              this.translate.use(this.translate.getBrowserLang());
          }
      }

      this.platform.ready().then(() => {
      const storageValue =  localStorage.getItem('app.Theme') || false;
      this.global.set('app.Theme', storageValue.toString() === 'false' ? false : true);
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#f9fafb');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.helperService.lockOrientation();
      this.translate.get('BACK').subscribe(backLabel => {
          this.config.set('backButtonText', backLabel);
      });
      if(!this.isForWeb){
          this.setupOnesignal();
      }
      if (!this.isForWeb) {
          this.setupDeeplinks();
      }
    });
  }
    setupOnesignal(){
        window['plugins'].OneSignal.setLogLevel({logLevel: 6, visualLevel: 0});

        const notificationOpenedCallback = (jsonData) => {
            console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };

        // Set your iOS Settings
        const iosSettings = {};
        iosSettings['kOSSettingsKeyAutoPrompt'] = false;
        iosSettings['kOSSettingsKeyInAppLaunchURL'] = false;

        window['plugins'].OneSignal
            .startInit('*******')
            .handleNotificationOpened(notificationOpenedCallback)
            .iOSSettings(iosSettings)
            .inFocusDisplaying(window['plugins'].OneSignal.OSInFocusDisplayOption.Notification)
            .endInit();
        window['plugins'].OneSignal.getIds((ids) => {
            localStorage.setItem("PlayerID", ids.userId);
            localStorage.setItem("push_token", ids.pushToken);
            console.log(ids);
        });
        // The promptForPushNotificationsWithUserResponse function will show the iOS push notification prompt.
        // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 6)
        window['plugins'].OneSignal.promptForPushNotificationsWithUserResponse((accepted) => {
            console.log('User accepted notifications: ' + accepted);
        });
    }
    setupDeeplinks() {
        this.deeplinks.routeWithNavController(this.navController, {
            '/payment-details' : {"status": true},
            '/clarification/:id': '/clarification',
            '/pre-approved/:id': '/pre-approved',
            '/certificate/:id': '/certificate'
        }).subscribe((match) => {
                this.zone.run(() => {
                    console.log(match)
                    if (match.$link.url.indexOf('payment') > -1) {
                        this.router.navigate(['/payment-details/' + match.$args.id]);
                    } else if (match.$route.indexOf('clarification') > -1) {
                        this.router.navigate(['/clarification/' + match.$args.id]);
                    } else if (match.$route.indexOf('pre-approved') > -1) {
                        this.router.navigate(['/pre-approved/' + match.$args.id]);
                    } else if (match.$route.indexOf('certificate') > -1) {
                        this.router.navigate(['/certificate/' + match.$args.id]);
                    }
                });
            },
            (nomatch) => {
                // alert(JSON.stringify(nomatch));
            });
    }
}
