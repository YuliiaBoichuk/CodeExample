import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentSchedulePageRoutingModule } from './payment-schedule-routing.module';

import { PaymentSchedulePage } from './payment-schedule.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PaymentSchedulePageRoutingModule,
        TranslateModule
    ],
  declarations: [PaymentSchedulePage]
})
export class PaymentSchedulePageModule {}
