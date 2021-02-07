import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { environment } from '../../../environments/environment.prod';

@Injectable({
	providedIn: 'root',
})
export class MenuService {
	menuPath = environment.MENU_PATH;

	constructor(private http: HttpClient, public userService: UserService) {}

	getMenuOptions() {
		return this.http.get<any[]>(this.menuPath).pipe(
			map((res: any[]) => {
				const menus: any[] = [];
				res.forEach(menu => {
					menu.roles.forEach(role => {
						if (role.roleId === this.userService.user.role.roleId) {
							menus.push(menu);
						}
					});
				});
				return menus;
			})
		);
	}
}
