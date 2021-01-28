import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoundMicPage } from './sound-mic.page';

const routes: Routes = [
  {
    path: '',
    component: SoundMicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoundMicPageRoutingModule {}
