import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TetCountdownComponent } from './tet-countdown.component';

const routes: Routes = [
  {
    path: '',
    component: TetCountdownComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TetCountdownRoutingModule { }
