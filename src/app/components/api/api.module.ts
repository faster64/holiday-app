import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiRoutingModule } from './api-routing.module';
import { ApiComponent } from './api.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';


@NgModule({
  declarations: [
    ApiComponent
  ],
  imports: [
    CommonModule,
    ApiRoutingModule,
    SharedModule,
    BaseLoadingModule
  ]
})
export class ApiModule { }
