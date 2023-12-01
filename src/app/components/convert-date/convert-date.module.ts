import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConvertDateRoutingModule } from './convert-date-routing.module';
import { ConvertDateComponent } from './convert-date.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DxDateBoxModule } from 'devextreme-angular';


@NgModule({
  declarations: [
    ConvertDateComponent
  ],
  imports: [
    CommonModule,
    ConvertDateRoutingModule,
    SharedModule,
    DxDateBoxModule
  ]
})
export class ConvertDateModule { }
