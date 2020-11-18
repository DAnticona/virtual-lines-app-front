import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

const pagesRoutes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
      },
      {
        path: 'stores',
        loadChildren: () => import('./stores/stores.module').then(m => m.StoresPageModule),
      },
      {
        path: 'my-account',
        loadChildren: () => import('./my-account/my-account.module').then(m => m.MyAccountPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
