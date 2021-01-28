import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HardwareProximityPageRoutingModule } from './hardware-proximity-routing.module';

import { HardwareProximityPage } from './hardware-proximity.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HardwareProximityPageRoutingModule,
        TranslateModule
    ],
  declarations: [HardwareProximityPage]
})
export class HardwareProximityPageModule {}
