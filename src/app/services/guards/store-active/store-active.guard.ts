import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../../user/user.service';
import { AlertService } from '../../alert/alert.service';
import { StoresService } from '../../store/stores.service';

@Injectable({
	providedIn: 'root',
})
export class StoreActiveGuard implements CanActivate {
	constructor(
		private userService: UserService,
		private storeService: StoresService,
		private alertService: AlertService
	) {}

	canActivate(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			if (!this.userService.user.store) {
				resolve(true);
			} else {
				this.storeService.isActive(this.userService.user.store.storeId).subscribe(active => {
					if (active) {
						resolve(true);
					} else {
						this.alertService.presentAlert(
							'Error',
							this.userService.user.store.publicName,
							'Este establecimiento se encuentra inactivo.'
						);
						this.userService.logout();
						resolve(false);
					}
				});
			}
		});
	}
}
