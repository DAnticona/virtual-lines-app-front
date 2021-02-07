import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformationTabPage } from './information-tab.page';

const routes: Routes = [
  {
    path: '',
    component: InformationTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationTabPageRoutingModule {}
