import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScreenSensorPageRoutingModule } from './screen-sensor-routing.module';

import { ScreenSensorPage } from './screen-sensor.page';

import { SafeHtmlPipe } from '../../safe-html';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ScreenSensorPageRoutingModule,
        TranslateModule
    ],
  declarations: [ScreenSensorPage, SafeHtmlPipe]
})
export class ScreenSensorPageModule {}
