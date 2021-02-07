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
export class SlotService {
	baseUrl = environment.url;

	constructor(
		private alertService: AlertService,
		private httpService: HttpService,
		private http: HttpClient
	) {}

	getSlotsActivesByLineId(id: string) {
		const url = `${this.baseUrl}/slot/line/${id}`;

		return this.http.get(url, this.httpService.getHttpOptions());
	}

	getSlotActiveByLineIdUserId(lineId: string, userId: string) {
		const url = `${this.baseUrl}/slot/line/${lineId}/user/${userId}`;

		return this.http.get(url, this.httpService.getHttpOptions());
	}

	saveSlot(slot: any) {
		const url = `${this.baseUrl}/slot`;

		return this.http.post(url, slot, this.httpService.getHttpOptions()).pipe(
			map(() => {
				this.alertService.presentToast(`Datos actualizados`, 'success');
				return true;
			}),
			catchError(err => {
				console.log(err);
				// const message = `${err.error.message}
				// <br />
				// <br />
				// ${err.error.detailMessage || ''}`;

				// this.alertService.presentAlert('Ups!', 'Error', message);
				this.alertService.presentAlertError(err.error);
				return throwError(err);
			})
		);
	}
}
