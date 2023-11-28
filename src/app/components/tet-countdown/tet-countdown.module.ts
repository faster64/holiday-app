import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TetCountdownRoutingModule } from './tet-countdown-routing.module';
import { TetCountdownComponent } from './tet-countdown.component';


@NgModule({
  declarations: [
    TetCountdownComponent
  ],
  imports: [
    CommonModule,
    TetCountdownRoutingModule
  ]
})
export class TetCountdownModule { }
