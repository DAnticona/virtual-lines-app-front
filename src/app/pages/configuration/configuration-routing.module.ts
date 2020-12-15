import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigurationPage } from './configuration.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'general',
  },
  {
    path: '',
    component: ConfigurationPage,
    children: [
      {
        path: 'general',
        loadChildren: () => import('./general/general.module').then(m => m.GeneralPageModule),
      },
      {
        path: 'location',
        loadChildren: () => import('./location/location.module').then(m => m.LocationPageModule),
      },
      {
        path: 'users-store',
        loadChildren: () => import('./users-store/users-store.module').then(m => m.UsersStorePageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationPageRoutingModule {}
