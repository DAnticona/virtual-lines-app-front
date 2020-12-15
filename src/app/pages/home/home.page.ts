import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from '../../services/menu/menu.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  menus: Observable<any>;
  constructor(private menuService: MenuService, public userService: UserService) {}
  ngOnInit() {
    this.menus = this.menuService.getMenuOptions();
  }
}
