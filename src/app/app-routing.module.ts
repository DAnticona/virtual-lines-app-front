import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/pages/home',
		pathMatch: 'full',
	},
	{
		path: 'login',
		loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
	},
	{
		path: 'register',
		loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule),
	},
	{
		path: 'register-client',
		loadChildren: () =>
			import('./register-client/register-client.module').then(m => m.RegisterClientPageModule),
	},
	{
		path: 'register-store',
		loadChildren: () => import('./register-store/register-store.module').then(m => m.RegisterStorePageModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
