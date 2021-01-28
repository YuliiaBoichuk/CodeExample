import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPageRoutingModule } from './forgot-routing.module';

import { ForgotPage } from './forgot.page';

import { TranslateModule } from '@ngx-translate/core';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPageRoutingModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
  ],
  declarations: [ForgotPage]
})
export class ForgotPageModule {}
