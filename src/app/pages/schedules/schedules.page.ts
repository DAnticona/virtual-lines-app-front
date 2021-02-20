import { Component, ViewChild } from '@angular/core';
import { newArray } from '@angular/compiler/src/util';
import { DatePipe } from '@angular/common';
import { IonDatetime, IonList, ModalController } from '@ionic/angular';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { UserService } from '../../services/user/user.service';
import { AlertService } from '../../services/alert/alert.service';
import { BookingService } from '../../services/booking/booking.service';
import { ScheduleComponent } from '../../components/schedule/schedule.component';

@Component({
	selector: 'app-schedules',
	templateUrl: './schedules.page.html',
	styleUrls: ['./schedules.page.scss'],
	providers: [DatePipe],
})
export class SchedulesPage {
	skeletons: any[] = newArray(30);
	schedules: any[];
	schedule: any;
	store: any;
	count: number;

	filter = false;
	today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();

	@ViewChild('lista') lista: IonList;
	@ViewChild('date') dateSchedule: IonDatetime;

	constructor(
		public scheduleService: ScheduleService,
		public userService: UserService,
		public bookingService: BookingService,
		public modalController: ModalController,
		private alertSerice: AlertService,
		private datePipe: DatePipe
	) {
		this.store = this.userService.user.store;
		this.getSchedules(this.today);
	}

	getSchedules(date: number, event?: any) {
		this.scheduleService.getScheduleByStoreIdDate(this.store.storeId, date).subscribe((res: any) => {
			this.schedules = res.object;
			this.count = res.count;
			this.schedules.sort((a, b) => {
				if (a.date < b.date) {
					return -1;
				}

				if (a.date > b.date) {
					return 1;
				}

				return a.start.localeCompare(b.start);
			});

			if (event) {
				event.target.complete();
			}
		});
	}

	async newSchedule() {
		const modal = await this.modalController.create({
			component: ScheduleComponent,
			cssClass: 'my-custom-class',
		});
		await modal.present();
		const { data } = await modal.onWillDismiss();

		if (data) {
			this.getSchedules(this.today);
			this.dateSchedule.value = this.datePipe.transform(this.today, 'yyyy-MM-dd HH:mm');
		}
	}

	delete(schedule: any) {
		this.lista.closeSlidingItems();

		if (schedule.bookingsNumber > 0) {
			this.alertSerice.presentAlert('¡Error!', 'No puede eliminar esta agenda', 'Existen reservas activas');
			return;
		}

		schedule.activeFg = 'N';
		schedule.storeId = this.store.storeId;
		this.update(this.dateSchedule.value, schedule);
	}

	update(date: string, schedule: any) {
		this.scheduleService.updateSchedule(schedule).subscribe(() => {
			this.getSchedules(new Date(date).getTime());
		});
	}

	onChangeDate() {
		this.getSchedules(new Date(this.dateSchedule.value).getTime());
	}

	refresh(event: any) {
		if (this.dateSchedule.value) {
			this.getSchedules(new Date(this.dateSchedule.value).getTime(), event);
		} else {
			event.target.complete();
		}
	}
}
