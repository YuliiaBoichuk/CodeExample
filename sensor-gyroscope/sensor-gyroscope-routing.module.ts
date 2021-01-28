import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SensorGyroscopePage } from './sensor-gyroscope.page';

const routes: Routes = [
  {
    path: '',
    component: SensorGyroscopePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SensorGyroscopePageRoutingModule {}
