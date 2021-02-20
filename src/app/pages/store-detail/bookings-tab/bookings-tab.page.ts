import { Component, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { newArray } from '@angular/compiler/src/util';
import { AlertController, IonDatetime } from '@ionic/angular';
import { StoresService } from '../../../services/store/stores.service';
import { UserService } from '../../../services/user/user.service';
import { ScheduleService } from '../../../services/schedule/schedule.service';
import { BookingService } from '../../../services/booking/booking.service';
import { TimePipe } from '../../../services/pipes/time/time.pipe';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
	selector: 'app-bookings-tab',
	templateUrl: './bookings-tab.page.html',
	styleUrls: ['./bookings-tab.page.scss'],
	providers: [DatePipe, TimePipe],
})
export class BookingsTabPage {
	skeletons: any[] = newArray(30);
	store: any = {};
	booking: any = {};
	schedules: any[];
	schedulesNumber: number;

	today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();

	@ViewChild('date') dateSchedule: IonDatetime;

	constructor(
		public storeService: StoresService,
		public scheduleService: ScheduleService,
		public bookingService: BookingService,
		public userService: UserService,
		public alertController: AlertController,
		private datePipe: DatePipe,
		private timePipe: TimePipe,
		private alertService: AlertService
	) {
		const storeId = localStorage.getItem('storeId') || null;
		this.getStore(storeId, this.today);
	}

	getStore(storeId: string, date: number, event?: any) {
		this.storeService.getStoreById(storeId).subscribe((res: any) => {
			this.store = res.object;
			this.scheduleService.getScheduleByStoreIdDate(storeId, date).subscribe((res1: any) => {
				const schedules = res1.object;
				this.schedulesNumber = res1.count;
				if (this.schedulesNumber > 0) {
					schedules.forEach(schedule => {
						this.bookingService
							.getBookingActiveByScheduleIdUserId(schedule.scheduleId, this.userService.user.userId)
							.subscribe((res2: any) => {
								schedule.isExists = !!res2.object;
								if (event) {
									event.target.complete();
								}
							});
					});
					this.schedules = schedules;
					this.schedules.sort((a, b) => (a.start < b.start ? -1 : 1));
				} else {
					this.schedules = [];
				}

				if (event) {
					event.target.complete();
				}
			});
		});
	}

	async presentAlertIn(header: string, subHeader: string, message: string) {
		const alert = await this.alertController.create({
			header,
			subHeader,
			message,
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
				},
				{
					text: 'Reservar',
					handler: () => {
						this.booking.quantity = 1;
						this.save();
					},
				},
			],
		});

		await alert.present();
	}

	async presentAlertInMultiple(header: string, subHeader: string, message: string, schedule: any) {
		const alert = await this.alertController.create({
			header,
			subHeader,
			message,
			inputs: [
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
						if (quantity > schedule.available || quantity < 1) {
							this.alertService.presentAlert(
								'Error',
								this.userService.user.name,
								'La cantidad debe estar entre 1 y la cantidad disponible'
							);
						} else {
							this.booking.quantity = quantity;
							this.save();
						}
					},
				},
			],
		});

		await alert.present();
	}

	async presentAlertOut(header: string, subHeader: string, message: string) {
		const alert = await this.alertController.create({
			header,
			subHeader,
			message,
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
				},
				{
					text: 'Eliminar la reserva',
					handler: () => {
						this.booking.attendedFg = 'N';
						this.booking.quantity = -1 * this.booking.quantity;
						this.save();
					},
				},
			],
		});

		await alert.present();
	}

	inOut(schedule: any) {
		this.bookingService
			.getBookingActiveByScheduleIdUserId(schedule.scheduleId, this.userService.user.userId)
			.subscribe((res: any) => {
				const isExists = !!res.object;
				if (isExists) {
					this.booking = res.object;
					this.booking.userId = this.userService.user.userId;
					this.booking.scheduleId = schedule.scheduleId;
					this.booking.activeFg = 'N';
					this.booking.endDate = new Date().getTime();
					this.presentAlertOut(
						`${this.datePipe.transform(schedule.date, 'dd-MM-yyyy')}`,
						`${this.timePipe.transform(schedule.start, 'HH:mm')} - ${this.timePipe.transform(
							schedule.end,
							'HH:mm'
						)}`,
						'¿Quieres eliminar la reserva?'
					);
				} else {
					this.booking = {};
					this.booking.userId = this.userService.user.userId;
					this.booking.scheduleId = schedule.scheduleId;
					this.booking.activeFg = 'S';
					this.booking.attendedFg = 'N';
					this.booking.startDate = new Date().getTime();

					if (schedule.multipleFg === 'N') {
						this.presentAlertIn(
							`${schedule.name}`,
							`${this.datePipe.transform(schedule.date, 'dd-MM-yyyy')}
							${this.timePipe.transform(schedule.start, 'HH:mm')} - ${this.timePipe.transform(schedule.end, 'HH:mm')}`,
							'¿Quieres reservar una cita?'
						);
					} else {
						this.presentAlertInMultiple(
							`${schedule.name}`,
							`${this.datePipe.transform(schedule.date, 'dd-MM-yyyy')}
						${this.timePipe.transform(schedule.start, 'HH:mm')} - ${this.timePipe.transform(schedule.end, 'HH:mm')}`,
							'¿Quieres reservar una cita?',
							schedule
						);
					}
				}
			});
	}

	save() {
		this.bookingService.saveBooking(this.booking).subscribe(
			(res: any) => {
				this.getStore(this.store.storeId, new Date(this.dateSchedule.value).getTime());
			},
			() => {
				this.getStore(this.store.storeId, new Date(this.dateSchedule.value).getTime());
			}
		);
	}

	onChangeDate() {
		this.getStore(this.store.storeId, new Date(this.dateSchedule.value).getTime());
	}

	refresh(event: any) {
		if (this.dateSchedule.value) {
			this.getStore(this.store.storeId, new Date(this.dateSchedule.value).getTime(), event);
		} else {
			event.target.complete();
		}
	}
}
