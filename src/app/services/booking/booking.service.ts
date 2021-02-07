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
export class BookingService {
	baseUrl = environment.url;

	constructor(
		private alertService: AlertService,
		private httpService: HttpService,
		private http: HttpClient
	) {}

	getBookingsActivesByScheduleId(id: string) {
		const url = `${this.baseUrl}/booking/schedule/${id}`;

		return this.http.get(url, this.httpService.getHttpOptions());
	}

	getBookingActiveByScheduleIdUserId(scheduleId: string, userId: string) {
		const url = `${this.baseUrl}/booking/schedule/${scheduleId}/user/${userId}`;

		return this.http.get(url, this.httpService.getHttpOptions());
	}

	saveBooking(booking: any) {
		const url = `${this.baseUrl}/booking`;

		return this.http.post(url, booking, this.httpService.getHttpOptions()).pipe(
			map(() => {
				if (!booking.bookingId) {
					this.alertService.presentAlert(`¡Bien!`, `Reserva confirmada`, ``);
				} else if (booking.attendedFg === 'S') {
					this.alertService.presentAlert(`¡Bien!`, `Se atendió la reserva`, ``);
				} else {
					this.alertService.presentAlert(`OK`, `Reserva eliminada`, `Se actualizaron los cupos`);
				}
				return true;
			}),
			catchError(err => {
				console.log(err);
				this.alertService.presentAlertError(err.error);
				return throwError(err);
			})
		);
	}
}
