import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AlertService } from '../alert/alert.service';
import { HttpService } from '../http/http.service';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class LinesService {
	baseUrl = environment.url;

	constructor(
		private http: HttpClient,
		private httpService: HttpService,
		private alertService: AlertService
	) {}

	getLine(id: string) {
		const url = `${this.baseUrl}/line/${id}`;

		return this.http.get(url, this.httpService.getHttpOptions());
	}

	getLinesByStoreId(id: string) {
		const url = `${this.baseUrl}/line/store/${id}`;

		return this.http.get(url, this.httpService.getHttpOptions());
	}

	newLine(line: any) {
		const url = `${this.baseUrl}/line`;

		return this.http.post(url, line, this.httpService.getHttpOptions()).pipe(
			map(() => {
				const message = line.lineId
					? `Fila: ${line.name} eliminada exitosamente`
					: `Fila: ${line.name} registrada exitosamente`;

				this.alertService.presentToast(message, 'success');
				return true;
			}),
			catchError(err => {
				console.log(err);
				// const message = `${err.error.message}
				// <br />
				// <br />
				// ${err.error.detailMessage || ''}`;

				// this.alertService.presentAlert('Error', line.name, message);
				this.alertService.presentAlertError(err.error);
				return throwError(err);
			})
		);
	}
}
