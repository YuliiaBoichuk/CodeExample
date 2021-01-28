import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SensorGyroscopePageRoutingModule } from './sensor-gyroscope-routing.module';

import { SensorGyroscopePage } from './sensor-gyroscope.page';
import {ComponentsModule} from '../../components/components.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SensorGyroscopePageRoutingModule,
        ComponentsModule,
        TranslateModule
    ],
  declarations: [SensorGyroscopePage]
})
export class SensorGyroscopePageModule {}
