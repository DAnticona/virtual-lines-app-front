import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HaveImageGuard } from '../services/guards/have-image/have-image.guard';
import { LoginGuard } from '../services/guards/login/login.guard';
import { TokenGuard } from '../services/guards/token/token.guard';
import { StoreActiveGuard } from '../services/guards/store-active/store-active.guard';
import { UserActiveGuard } from '../services/guards/user-active/user-active.guard';

const pagesRoutes: Routes = [
	{
		path: 'pages',
		canActivate: [LoginGuard],
		component: PagesComponent,
		children: [
			{
				path: 'home',
				canActivate: [TokenGuard, StoreActiveGuard, UserActiveGuard],
				loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
			},
			{
				path: 'stores',
				canActivate: [TokenGuard, StoreActiveGuard, UserActiveGuard],
				loadChildren: () => import('./stores/stores.module').then(m => m.StoresPageModule),
			},
			{
				path: 'my-account',
				canActivate: [TokenGuard, StoreActiveGuard, UserActiveGuard],
				loadChildren: () => import('./my-account/my-account.module').then(m => m.MyAccountPageModule),
			},
			{
				path: 'lines',
				canActivate: [HaveImageGuard, TokenGuard, StoreActiveGuard, UserActiveGuard],
				loadChildren: () => import('./lines/lines.module').then(m => m.LinesPageModule),
			},
			{
				path: 'line-detail/:id',
				canActivate: [TokenGuard, StoreActiveGuard, UserActiveGuard],
				loadChildren: () => import('./line-detail/line-detail.module').then(m => m.LineDetailPageModule),
			},
			{
				path: 'configuration',
				canActivate: [TokenGuard, StoreActiveGuard, UserActiveGuard],
				loadChildren: () =>
					import('./configuration/configuration.module').then(m => m.ConfigurationPageModule),
			},
			{
				path: 'store-detail/:id',
				canActivate: [TokenGuard, StoreActiveGuard, UserActiveGuard],
				loadChildren: () => import('./store-detail/store-detail.module').then(m => m.StoreDetailPageModule),
			},
			{
				path: 'schedules',
				canActivate: [HaveImageGuard, TokenGuard, StoreActiveGuard, UserActiveGuard],
				loadChildren: () => import('./schedules/schedules.module').then(m => m.SchedulesPageModule),
			},
			{
				path: 'schedule-detail/:id',
				canActivate: [TokenGuard, StoreActiveGuard, UserActiveGuard],
				loadChildren: () =>
					import('./schedule-detail/schedule-detail.module').then(m => m.ScheduleDetailPageModule),
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
