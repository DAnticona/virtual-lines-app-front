import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { AlertService } from '../../alert/alert.service';

@Injectable({
	providedIn: 'root',
})
export class TokenGuard implements CanActivate {
	constructor(public userService: UserService, public router: Router, public alertService: AlertService) {}

	canActivate() {
		const payload = JSON.parse(atob(this.userService.token.split('.')[1]));
		const ahora = new Date().getTime() / 1000;
		if (payload.exp < ahora) {
			this.alertService.presentAlert(
				'Ups',
				'Ha pasado mucho tiempo desde su último inicio de sesión',
				'Por favor por seguridad vuelva a iniciar sesión'
			);
			this.userService.logout();
		} else {
			return true;
		}
	}
}
