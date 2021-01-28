import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HardwareChargerPage } from './hardware-charger.page';

const routes: Routes = [
  {
    path: '',
    component: HardwareChargerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HardwareChargerPageRoutingModule {}
