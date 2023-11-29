import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TetCountdownRoutingModule } from './tet-countdown-routing.module';
import { TetCountdownComponent } from './tet-countdown.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TetCountdownComponent
  ],
  imports: [
    CommonModule,
    TetCountdownRoutingModule,
    SharedModule
  ]
})
export class TetCountdownModule { }
