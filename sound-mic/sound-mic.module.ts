import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SoundMicPageRoutingModule } from './sound-mic-routing.module';

import { SoundMicPage } from './sound-mic.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SoundMicPageRoutingModule,
        TranslateModule
    ],
  declarations: [SoundMicPage]
})
export class SoundMicPageModule {}
