import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpService } from '../http/http.service';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class RoleService {
	baseUrl = environment.url;

	constructor(private httpService: HttpService, private http: HttpClient) {}

	getRolesStore() {
		const url = `${this.baseUrl}/role/store`;

		return this.http.get(url, this.httpService.getHttpOptions()).pipe(
			map((res: any) => {
				return res.object;
			})
		);
	}
}
