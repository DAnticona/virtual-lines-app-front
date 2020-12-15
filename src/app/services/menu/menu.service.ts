import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MENU_PATH } from '../../config/config';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menuPath = MENU_PATH;
  menus: any[] = [];

  constructor(private http: HttpClient, public userService: UserService) {}

  getMenuOptions() {
    return this.http.get<any[]>(this.menuPath).pipe(
      map((res: any[]) => {
        if (this.userService.user.storeFg === 'S') {
          return res.filter(menu => menu.store);
        } else {
          return res.filter(menu => menu.client);
        }
      })
    );
  }
}
