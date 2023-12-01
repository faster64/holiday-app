import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvertDateComponent } from './convert-date.component';

const routes: Routes = [
  {
    path: '',
    component: ConvertDateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConvertDateRoutingModule { }
