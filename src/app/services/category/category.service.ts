import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	baseUrl = environment.url;
	user: any;

	constructor(private http: HttpClient) {}

	getCategories() {
		const url = `${this.baseUrl}/register/category`;
		return this.http.get(url);
	}
}
