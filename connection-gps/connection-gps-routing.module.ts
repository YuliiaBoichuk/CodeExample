import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectionGpsPage } from './connection-gps.page';

const routes: Routes = [
  {
    path: '',
    component: ConnectionGpsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectionGpsPageRoutingModule {}
