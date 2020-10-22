import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MENU_PATH } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menuPath = MENU_PATH;

  constructor(private http: HttpClient) {}

  getMenuOptions() {
    return this.http.get<any[]>(this.menuPath);
  }
}
