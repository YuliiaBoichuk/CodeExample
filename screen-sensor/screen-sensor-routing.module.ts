import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScreenSensorPage } from './screen-sensor.page';

const routes: Routes = [
  {
    path: '',
    component: ScreenSensorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreenSensorPageRoutingModule {}
