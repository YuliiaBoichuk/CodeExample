import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentSchedulePage } from './payment-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentSchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentSchedulePageRoutingModule {}
