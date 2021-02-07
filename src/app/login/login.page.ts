import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage {
	user: any = {};
	loading = false;

	constructor(public userService: UserService, public navController: NavController) {}

	login() {
		this.loading = true;
		this.userService.login(this.user).subscribe(
			res => {
				if (res) {
					this.navController.navigateRoot('/pages/home', { animated: true });
				}
				this.loading = false;
			},
			() => {
				this.loading = false;
			}
		);
	}
}
