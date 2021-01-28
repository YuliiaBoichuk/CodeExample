import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HardwareChargerPageRoutingModule } from './hardware-charger-routing.module';

import { HardwareChargerPage } from './hardware-charger.page';
import { ComponentsModule } from '../../components/components.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HardwareChargerPageRoutingModule,
        ComponentsModule,
        TranslateModule,
    ],
  declarations: [HardwareChargerPage]
})
export class HardwareChargerPageModule {}
