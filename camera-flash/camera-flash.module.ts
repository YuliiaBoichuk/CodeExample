import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CameraFlashPageRoutingModule } from './camera-flash-routing.module';

import { CameraFlashPage } from './camera-flash.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CameraFlashPageRoutingModule,
        TranslateModule
    ],
  declarations: [CameraFlashPage]
})
export class CameraFlashPageModule {}
