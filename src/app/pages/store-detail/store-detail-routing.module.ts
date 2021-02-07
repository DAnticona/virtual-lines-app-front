import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreDetailPage } from './store-detail.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'information-tab',
  },
  {
    path: '',
    component: StoreDetailPage,
    children: [
      {
        path: 'information-tab',
        loadChildren: () =>
          import('./information-tab/information-tab.module').then(m => m.InformationTabPageModule),
      },
      {
        path: 'lines-tab',
        loadChildren: () => import('./lines-tab/lines-tab.module').then(m => m.LinesTabPageModule),
      },
      {
        path: 'bookings-tab',
        loadChildren: () => import('./bookings-tab/bookings-tab.module').then(m => m.BookingsTabPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreDetailPageRoutingModule {}
