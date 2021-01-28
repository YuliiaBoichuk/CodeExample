import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyServicePage } from './buy-service.page';

const routes: Routes = [
    {
        path: '',
        component: BuyServicePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BuyServicePageRoutingModule {}
