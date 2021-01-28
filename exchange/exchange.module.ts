import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExchangePageRoutingModule } from './exchange-routing.module';

import { ExchangePage } from './exchange.page';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CompleteModalPage } from '../complete-modal/complete-modal.page';
import { CompleteModalPageModule } from '../complete-modal/complete-modal.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  entryComponents: [
    CompleteModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExchangePageRoutingModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    CompleteModalPageModule,
    ComponentsModule,
  ],
  declarations: [ExchangePage]
})
export class ExchangePageModule {}
