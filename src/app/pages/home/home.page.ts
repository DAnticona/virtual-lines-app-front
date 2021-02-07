import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from '../../services/menu/menu.service';
import { UserService } from '../../services/user/user.service';
import { AlertService } from '../../services/alert/alert.service';
import { RoleEnum } from '../../enums/role.enum';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	menus: Observable<any>;

	constructor(
		private menuService: MenuService,
		public userService: UserService,
		public alertService: AlertService
	) {}

	ionViewDidEnter() {
		this.menus = this.menuService.getMenuOptions();
		this.userService.loadStorage();
		if (this.userService.user.store && !this.userService.user.store.avatar) {
			const color = 'tertiary';
			const duration = 5000;
			let message = `<strong>No se ha registrado un ávatar para este establecimiento</strong>.`;

			if (this.userService.user.role.roleId === RoleEnum.ADMINISTRATOR) {
				message = message + `<br /><br />Por favor registra uno desde el menú configuración`;
			}

			const buttons = [
				{
					text: 'OK',
					icon: 'checkmark',
					role: 'cancel',
				},
			];
			this.alertService.presentToastWhitOptions(message, color, duration, buttons);
		}
	}
}
