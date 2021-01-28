import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HardwareFingerprintPage } from './hardware-fingerprint.page';

const routes: Routes = [
  {
    path: '',
    component: HardwareFingerprintPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HardwareFingerprintPageRoutingModule {}
