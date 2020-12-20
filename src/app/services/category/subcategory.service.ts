import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG_PATH } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  baseUrl = CONFIG_PATH;
  user: any;

  constructor(private http: HttpClient) {}

  getSubcategoriesByCategoryId(id: string) {
    const url = `${this.baseUrl}/register/subcategory/${id}`;

    return this.http.get(url);
  }
}
