import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserService } from '../../user/user.service';

@Injectable({
	providedIn: 'root',
})
export class LoginGuard implements CanActivate {
	constructor(public userService: UserService, public navController: NavController) {}

	canActivate(): boolean {
		if (this.userService.isLogged()) {
			return true;
		} else {
			// this.router.navigate(['/login']);
			this.navController.navigateRoot('/login', { animated: true });
			return false;
		}
	}
}
