import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { MenuService } from '../services/menu/menu.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  menus: Observable<any[]>;

  constructor(
    private menuCtrl: MenuController,
    private menuService: MenuService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.menus = this.menuService.getMenuOptions();
  }

  logout() {
    this.menuCtrl.toggle();
    this.userService.logout();
  }
}
