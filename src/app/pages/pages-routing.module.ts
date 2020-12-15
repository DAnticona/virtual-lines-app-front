import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { StoreDetailPageModule } from './store-detail/store-detail.module';

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
      {
        path: 'lines',
        loadChildren: () => import('./lines/lines.module').then(m => m.LinesPageModule),
      },
      {
        path: 'line-detail/:id',
        loadChildren: () => import('./line-detail/line-detail.module').then(m => m.LineDetailPageModule),
      },
      {
        path: 'configuration',
        loadChildren: () =>
          import('./configuration/configuration.module').then(m => m.ConfigurationPageModule),
      },
      {
        path: 'store-detail/:id',
        loadChildren: () => import('./store-detail/store-detail.module').then(m => m.StoreDetailPageModule),
      },
      {
        path: '',
        redirectTo: '/pages/home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
