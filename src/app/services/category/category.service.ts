import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG_PATH } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = CONFIG_PATH;
  user: any;

  constructor(private http: HttpClient) {}

  getCategories() {
    const url = `${this.baseUrl}/register/category`;
    return this.http.get(url);
  }
}
