import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LineDetailPage } from './line-detail.page';

const routes: Routes = [
  {
    path: '',
    component: LineDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LineDetailPageRoutingModule {}
