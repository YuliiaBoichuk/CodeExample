import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyServicePageRoutingModule } from './buy-service-routing.module';

import { BuyServicePage } from './buy-service.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import {InformationForTestPage} from '../information-for-test/information-for-test.page';
import {InformationForTestPageModule} from '../information-for-test/information-for-test.module';

@NgModule({
    entryComponents: [
        InformationForTestPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ComponentsModule,
        BuyServicePageRoutingModule,
        ReactiveFormsModule,
        TranslateModule.forChild(),
        InformationForTestPageModule
    ],
    declarations: [BuyServicePage]
})
export class BuyServicePageModule {}
