import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnectionGpsPageRoutingModule } from './connection-gps-routing.module';

import { ConnectionGpsPage } from './connection-gps.page';
import {ComponentsModule} from "../../components/components.module";
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ConnectionGpsPageRoutingModule,
        ComponentsModule,
        TranslateModule
    ],
  declarations: [ConnectionGpsPage]
})
export class ConnectionGpsPageModule {}
