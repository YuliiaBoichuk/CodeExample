import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HardwareProximityPage } from './hardware-proximity.page';

const routes: Routes = [
  {
    path: '',
    component: HardwareProximityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HardwareProximityPageRoutingModule {}
