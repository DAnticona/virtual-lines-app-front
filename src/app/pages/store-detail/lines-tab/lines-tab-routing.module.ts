import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinesTabPage } from './lines-tab.page';

const routes: Routes = [
  {
    path: '',
    component: LinesTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinesTabPageRoutingModule {}
