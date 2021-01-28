import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CameraFlashPage } from './camera-flash.page';

const routes: Routes = [
  {
    path: '',
    component: CameraFlashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CameraFlashPageRoutingModule {}
