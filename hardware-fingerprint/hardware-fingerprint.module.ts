import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HardwareFingerprintPageRoutingModule } from './hardware-fingerprint-routing.module';

import { HardwareFingerprintPage } from './hardware-fingerprint.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HardwareFingerprintPageRoutingModule,
    TranslateModule
  ],
  declarations: [HardwareFingerprintPage]
})
export class HardwareFingerprintPageModule {}
