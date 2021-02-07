import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { ValidatorsService } from '../../services/validators/validators.service';

@Component({
	selector: 'app-schedule',
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.scss'],
	providers: [DatePipe],
})
export class ScheduleComponent implements OnInit {
	schedule: any;
	form: FormGroup;
	today = new Date();
	loading = false;

	store: any = {};
	haveCapacity = false;
	haveEndDate = false;
	haveMultipleFg = false;
	haveMaxPerClient = false;

	constructor(
		public userService: UserService,
		public scheduleService: ScheduleService,
		public validators: ValidatorsService,
		private fb: FormBuilder,
		public modalController: ModalController,
		private datePipe: DatePipe
	) {
		this.store = this.userService.user.store;
		this.createForm();
	}

	ngOnInit() {}

	createForm() {
		this.form = this.fb.group(
			{
				name: ['', Validators.required],
				startDate: [this.datePipe.transform(this.today, 'yyyy-MM-dd'), Validators.required],
				endDate: [this.datePipe.transform(this.today, 'yyyy-MM-dd'), Validators.required],
				start: [this.datePipe.transform(this.today, 'HH:mm'), Validators.required],
				end: [this.datePipe.transform(this.today, 'HH:mm'), Validators.required],
				capacityFg: [false, Validators.required],
				capacity: '',
				multipleFg: [false, Validators.required],
				maxPerClientFg: [false, Validators.required],
				maxPerClient: '',
			},
			{
				validators: this.validators.timesValid('startDate', 'start', 'endDate', 'end'),
			}
		);
	}

	changeStartDate() {
		if (!this.haveEndDate) {
			this.endDate.setValue(this.startDate.value);
		}
	}

	save() {
		if (!this.form.valid) {
			return Object.values(this.form.controls).forEach(control => {
				control.markAsTouched();
			});
		}
		this.loading = true;

		this.schedule = {};
		this.schedule.storeId = this.store.storeId;
		this.schedule.activeFg = 'S';

		this.schedule.name = this.name.value;

		this.schedule.startDate = new Date(
			this.startDate.value.substr(0, 4),
			Number(this.startDate.value.substr(5, 2)) - 1,
			this.startDate.value.substr(8, 2)
		).getTime();

		this.schedule.endDate = new Date(
			this.endDate.value.substr(0, 4),
			Number(this.endDate.value.substr(5, 2)) - 1,
			this.endDate.value.substr(8, 2)
		).getTime();

		this.schedule.start = this.start.value;
		this.schedule.end = this.end.value;
		this.schedule.capacityFg = this.capacityFg.value ? 'S' : 'N';
		this.schedule.capacity = this.capacityFg.value ? this.capacity.value : null;
		this.schedule.reservedNu = 0;
		this.schedule.multipleFg = this.multipleFg.value ? 'S' : 'N';
		this.schedule.maxPerClientFg = this.maxPerClientFg.value ? 'S' : 'N';
		this.schedule.maxPerClient = this.maxPerClientFg.value ? this.maxPerClient.value : null;

		this.scheduleService.newSchedule(this.schedule).subscribe(
			() => {
				this.loading = false;
				this.dismiss();
			},
			() => {
				this.loading = false;
			}
		);
	}

	dismiss() {
		this.modalController.dismiss({
			dismissed: true,
		});
	}

	toggleCapacity() {
		this.haveCapacity = !this.haveCapacity;
	}

	toggleEndDate() {
		this.endDate.setValue(this.startDate.value);
		this.haveEndDate = !this.haveEndDate;
	}

	toggleMultipleFg() {
		this.haveMultipleFg = !this.haveMultipleFg;
	}

	toggleMaxPerClient() {
		this.haveMaxPerClient = !this.haveMaxPerClient;
	}

	// Getters
	get name() {
		return this.form.get('name');
	}
	get startDate() {
		return this.form.get('startDate');
	}
	get endDate() {
		return this.form.get('endDate');
	}
	get start() {
		return this.form.get('start');
	}
	get end() {
		return this.form.get('end');
	}
	get capacityFg() {
		return this.form.get('capacityFg');
	}
	get capacity() {
		return this.form.get('capacity');
	}
	get multipleFg() {
		return this.form.get('multipleFg');
	}
	get maxPerClientFg() {
		return this.form.get('maxPerClientFg');
	}
	get maxPerClient() {
		return this.form.get('maxPerClient');
	}
}
