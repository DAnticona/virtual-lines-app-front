import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../../user/user.service';
import { AlertService } from '../../alert/alert.service';
import { RoleEnum } from '../../../enums/role.enum';

@Injectable({
	providedIn: 'root',
})
export class HaveImageGuard implements CanActivate {
	constructor(private userService: UserService, private alertService: AlertService) {}

	canActivate(): boolean {
		if (this.userService.user.store && !this.userService.user.store.avatar) {
			let message = `Este establecimiento no tiene un ávatar registrado.`;

			if (this.userService.user.role.roleId === RoleEnum.ADMINISTRATOR) {
				message =
					message +
					`<br />
				<br />
				Por favor carga uno desde el menú Configuración`;
			}

			this.alertService.presentAlert('Ups!', this.userService.user.store.publicName, message);
			return false;
		}
		return true;
	}
}
