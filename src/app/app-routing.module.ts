import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routing } from './shared/constants/common.constant';

const routes: Routes = [
  {
    path: Routing.TET_COUNTDOWN.path,
    loadChildren: () => import('./components/tet-countdown/tet-countdown.module').then(m => m.TetCountdownModule),
    data: {
      key: Routing.TET_COUNTDOWN.key,
    }
  },
  {
    path: Routing.LIST_HOLIDAYS.path,
    loadChildren: () => import('./components/holidays/holidays.module').then(m => m.HolidaysModule),
    data: {
      key: Routing.LIST_HOLIDAYS.key,
    }
  },
  {
    path: "**",
    redirectTo: `/${Routing.TET_COUNTDOWN.path}`,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
