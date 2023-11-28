import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidaysRoutingModule } from './holidays-routing.module';
import { HolidaysComponent } from './holidays.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    HolidaysComponent
  ],
  imports: [
    CommonModule,
    HolidaysRoutingModule,
    SharedModule
  ]
})
export class HolidaysModule { }
