import { newArray } from '@angular/compiler/src/util';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonList, AlertController } from '@ionic/angular';
import { BookingService } from '../../services/booking/booking.service';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { UserService } from '../../services/user/user.service';
import { AlertService } from '../../services/alert/alert.service';

@Component({
	selector: 'app-schedule-detail',
	templateUrl: './schedule-detail.page.html',
	styleUrls: ['./schedule-detail.page.scss'],
})
export class ScheduleDetailPage {
	skeletons: any[] = newArray(30);
	schedule: any = {};
	bookings: any[];
	booking: any = {};

	@ViewChild('lista') lista: IonList;

	constructor(
		public bookingService: BookingService,
		public scheduleService: ScheduleService,
		public userService: UserService,
		private alertService: AlertService,
		public activatedRoute: ActivatedRoute,
		public alertController: AlertController
	) {
		this.activatedRoute.params.subscribe(param => {
			const id = param.id;
			this.getSchedule(id);
		});
	}

	openAddClient() {
		const header = `Agregar cliente`;
		if (this.schedule.multipleFg === 'N') {
			this.presentAlertInSimple(header);
		} else {
			this.presentAlertInMultiple(header);
		}
	}

	async presentAlertInSimple(header: string) {
		const alert = await this.alertController.create({
			header,
			inputs: [
				{
					name: 'email',
					type: 'text',
					placeholder: 'Correo electrónico del cliente',
				},
			],
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
				},
				{
					text: 'Ok',
					handler: res => {
						if (!res.email) {
							return;
						}
						this.addClient(res.email, 1);
					},
				},
			],
		});

		await alert.present();
	}

	async presentAlertInMultiple(header: string) {
		const alert = await this.alertController.create({
			header,
			inputs: [
				{
					name: 'email',
					type: 'email',
					placeholder: 'Correo electrónico del cliente',
				},
				{
					name: 'count',
					type: 'number',
					placeholder: 'Nro. de reservas',
				},
			],
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
				},
				{
					text: 'Reservar',
					handler: data => {
						const quantity = Number(data.count);
						this.addClient(data.email, quantity);
					},
				},
			],
		});

		await alert.present();
	}

	getSchedule(scheduleId: string, event?: any) {
		this.scheduleService.getSchedule(scheduleId).subscribe((res: any) => {
			this.schedule = res.object;
			this.bookingService.getBookingsActivesByScheduleId(scheduleId).subscribe((res: any) => {
				this.bookings = res.object;
				this.bookings.sort((a, b) => a.startDate - b.startDate);
				this.bookings.forEach(slot => {
					slot.startDate = new Date(slot.startDate);
				});
				if (event) {
					event.target.complete();
				}
			});
		});
	}

	attend(booking: any, attended: boolean) {
		booking.activeFg = 'N';
		booking.attendedFg = attended ? 'S' : 'N';
		booking.endDate = new Date().getTime();
		booking.startDate = booking.startDate.getTime();
		booking.scheduleId = booking.schedule.scheduleId;
		booking.userId = booking.user.userId;
		booking.quantity = attended ? 0 : -booking.quantity;
		this.lista.closeSlidingItems();
		this.save(booking);
	}

	save(booking) {
		this.bookingService.saveBooking(booking).subscribe((res: any) => {
			this.getSchedule(this.schedule.scheduleId);
		});
	}

	addClient(email: string, quantity: number) {
		this.userService.getUserByEmail(email).subscribe(
			(res: any) => {
				const user = res.object;
				if (user) {
					this.booking = {
						userId: user.userId,
						scheduleId: this.schedule.scheduleId,
						activeFg: 'S',
						attendedFg: 'N',
						startDate: new Date().getTime(),
						quantity,
					};
					this.save(this.booking);
				} else {
					this.alertService.presentAlert('¡Ups!', 'No se encontró el cliente', email);
				}
			},
			() => {
				this.alertService.presentAlert('¡Ups!', 'No se encontró el cliente', email);
			}
		);
	}
}
