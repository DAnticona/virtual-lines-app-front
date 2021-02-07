import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../user/user.service';
import { AlertService } from '../../alert/alert.service';

@Injectable({
	providedIn: 'root',
})
export class UserActiveGuard implements CanActivate {
	constructor(private userService: UserService, private alertService: AlertService) {}

	canActivate(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.userService.isActive(this.userService.user.email).subscribe(active => {
				if (active) {
					resolve(true);
				} else {
					this.alertService.presentAlert('Error', this.userService.user.email, 'Usuario inactivo.');
					this.userService.logout();
					resolve(false);
				}
			});
		});
	}
}
