import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-sound-mic',
  templateUrl: './sound-mic.page.html',
  styleUrls: ['./sound-mic.page.scss'],
})
export class SoundMicPage implements OnInit {
  showTest: boolean;
  showCongrat: boolean;
  showCongratParam: object;
  randNum: any[];
  micGranted: boolean;
  answered: boolean;
  listening: boolean;
  prevTest: string;
  nextTest: string;
  isLastTest: boolean;

  constructor(
      private helperService: HelperService,
      private cd: ChangeDetectorRef,
      private router: Router,
      private speech: SpeechRecognition,
      private translateService: TranslateService,
  ) {
    this.showTest = false;
    this.showCongrat = false;
    this.showCongratParam = {};
    this.randNum = [];
    this.micGranted = false;
    this.answered = false;
    this.listening = false;
    this.prevTest = this.helperService.getPrevTestPath(this.router.url);
    this.nextTest = this.helperService.getNextTestPath(this.router.url);
    this.isLastTest = this.helperService.isLastTest(this.router.url);
  }

  /*// Check permission
  async hasPermission(): Promise<boolean> {
    try {
      const permission = await this.speech.hasPermission();
      console.log(permission);
      return permission;
    } catch (e) {
      console.error(e);
    }
  }
  // Request permissions
  async getPermission(): Promise<void> {
    try {
      const permission = this.speech.requestPermission();
      console.log(permission);
      return permission;
    } catch (e) {
      console.error(e);
    }
  }
  // Check feature available
  async isSpeechSupported(): Promise<boolean> {
    const isAvailable = await this.speech.isRecognitionAvailable();
    console.log(isAvailable);
    return isAvailable;
  }

  // Start the recognition process
  listenForSpeech() {
    const options = {
      language: 'ru-RU',
      matches: 1,
      prompt: 'Говорите в телефон!',      // Android only
      showPopup: true,  // Android only
      showPartial: true
    };
    this.speech.startListening(options).subscribe(
        (data) => {
          // Stop the recognition process (iOS only)
          console.log('Stop listening ' + data);
          // this.speech.stopListening();
          this.onEnter( +data.join(' ') );
        },
        (error) => { console.error(error); });
  }*/

  ngOnInit() {
    // Check feature available
    this.speech.isRecognitionAvailable()
      .then((available: boolean) => console.log(available));
    // Check permission
    this.speech.hasPermission()
      .then((hasPermission: boolean) => console.log(hasPermission));
    // Request permissions
    this.speech.requestPermission()
      .then(
          () => { console.log('Granted'); this.micGranted = true; },
          () => { console.log('Denied'); }
      );
  }

  ionViewWillEnter() {}

  onStart() {
      if (this.micGranted) {
          this.answered = false;
          this.randNum.push(this.helperService.getRandom(0, 9));

          this.showTest = true;
          this.cd.detectChanges();

          setTimeout(() => {
              // Start the recognition process
              this.listening = true;
              console.log('Listening...');
              this.cd.detectChanges();
              // this.listenForSpeech();
              const options = {
                  language: 'ru-RU',
                  matches: 1,
                  prompt: 'Говорите в телефон!',      // Android only
                  showPopup: true,  // Android only
                  showPartial: true
              };
              this.speech.startListening(options).subscribe(
                  (data) => {
                      if (!this.answered) {
                          console.log('Stop listening ' + data);
                          let output = data.join(' ');
                          output = this.helperService.wordToNum(output);
                          this.answered = true;
                          this.onEnter(output);
                      }
                      this.listening = false;
                      this.speech.stopListening(); // iOS only
                      this.cd.detectChanges();
                  },
                  (error) => {
                      if (!this.answered) {
                          console.error(error);
                          this.answered = true;
                          this.onEnter('a');
                      }
                      this.listening = false;
                      this.speech.stopListening(); // iOS only
                      this.cd.detectChanges();
                  });

          }, 2000);
      } else {
          console.log('Microphone not granted');
          this.onEnter(null);
      }
  }

  onRepeat() {
      this.showCongrat = false;

      // Check feature available
      this.speech.isRecognitionAvailable()
          .then((available: boolean) => console.log(available));
      // Check permission
      this.speech.hasPermission()
          .then((hasPermission: boolean) => console.log(hasPermission));
      // Request permissions
      this.speech.requestPermission()
          .then(
              () => { console.log('Granted'); this.micGranted = true; },
              () => { console.log('Denied'); }
          );

      this.cd.detectChanges();
  }

  onEnter(key) {
    if (Number(this.randNum[0]) === Number(key)) {
      console.log('Congratulations!' + key);
      this.showCongratParam = {
        icon: 'checkmark-outline',
        iconClass: 'icon-passed',
          header: this.translateService.instant('TEST.GOOD_WORK'),
          text: this.translateService.instant('MIC_TEST.TITLE') +
              this.translateService.instant('TEST.SUCCESS'),
        nextTest: this.helperService.getNextTestPath(this.router.url),
      };
      this.helperService.setData('mic', 2);
    } else {
      console.log('Bad answer!' + key);
      this.showCongratParam = {
        icon: 'close-outline',
        iconClass: 'icon-fail',
          header: this.translateService.instant('TEST.SORRY'),
          text: this.translateService.instant('MIC_TEST.FAIL'),
        nextTest: this.helperService.getNextTestPath(this.router.url),
      };
      this.helperService.setData('mic', 1);
    }

    // Back to screen
    this.showTest = false;
    this.showCongrat = true;

    // Cleaning answer
    this.randNum = [];

    this.cd.detectChanges();
  }
    public goToHomePage() {
        this.router.navigate(['/app/tabs/home']);
    }
}
