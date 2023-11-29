import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidaysRoutingModule } from './holidays-routing.module';
import { HolidaysComponent } from './holidays.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HolidayBoxComponent } from './holiday-box/holiday-box.component';
import { DxPopupModule } from 'devextreme-angular';


@NgModule({
  declarations: [
    HolidaysComponent,
    HolidayBoxComponent
  ],
  imports: [
    CommonModule,
    HolidaysRoutingModule,
    SharedModule,
    DxPopupModule
  ]
})
export class HolidaysModule { }
