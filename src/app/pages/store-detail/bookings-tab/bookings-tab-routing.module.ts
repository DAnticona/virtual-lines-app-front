import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingsTabPage } from './bookings-tab.page';

const routes: Routes = [
  {
    path: '',
    component: BookingsTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingsTabPageRoutingModule {}
