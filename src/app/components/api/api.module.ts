import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiRoutingModule } from './api-routing.module';
import { ApiComponent } from './api.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ApiComponent
  ],
  imports: [
    CommonModule,
    ApiRoutingModule,
    SharedModule
  ]
})
export class ApiModule { }
