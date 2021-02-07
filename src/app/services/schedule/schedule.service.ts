import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from '../http/http.service';
import { AlertService } from '../alert/alert.service';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class ScheduleService {
	baseUrl = environment.url;

	constructor(
		private http: HttpClient,
		private httpService: HttpService,
		private alertService: AlertService
	) {}

	getSchedule(id: string) {
		const url = `${this.baseUrl}/schedule/${id}`;

		return this.http.get(url, this.httpService.getHttpOptions());
	}

	getScheduleByStoreId(id: string) {
		const url = `${this.baseUrl}/schedule/store/${id}`;

		return this.http.get(url, this.httpService.getHttpOptions());
	}

	getScheduleByStoreIdDate(storeId: string, date: number) {
		const url = `${this.baseUrl}/schedule/store/${storeId}/date/${date}`;

		return this.http.get(url, this.httpService.getHttpOptions());
	}

	newSchedule(schedule: any) {
		const url = `${this.baseUrl}/schedule`;

		return this.http.post(url, schedule, this.httpService.getHttpOptions()).pipe(
			map(() => {
				this.alertService.presentToast('datos registrados', 'success');
				return true;
			}),
			catchError(err => {
				console.log(err);
				// const message = `${err.error.message}
				// <br />
				// <br />
				// ${err.error.detailMessage || ''}`;

				// this.alertService.presentAlert(
				// 	'Error',
				// 	`${schedule.date} : ${schedule.start} - ${schedule.end}`,
				// 	message
				// );
				this.alertService.presentAlertError(err.error);
				return throwError(err);
			})
		);
	}

	updateSchedule(schedule: any) {
		const url = `${this.baseUrl}/schedule`;

		return this.http.put(url, schedule, this.httpService.getHttpOptions()).pipe(
			map(() => {
				this.alertService.presentToast('Datos actualizados', 'success');
				return true;
			}),
			catchError(err => {
				console.log(err);
				// const message = `${err.error.message}
				// <br />
				// <br />
				// ${err.error.detailMessage || ''}`;

				// this.alertService.presentAlert(
				// 	'Error',
				// 	`${schedule.date} : ${schedule.start} - ${schedule.end}`,
				// 	message
				// );
				this.alertService.presentAlertError(err.error);
				return throwError(err);
			})
		);
	}

	updateReservedNu(schedule: any) {
		const url = `${this.baseUrl}/schedule`;

		return this.http.put(url, schedule, this.httpService.getHttpOptions());
	}
}
