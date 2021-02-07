import { newArray } from '@angular/compiler/src/util';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonList, AlertController } from '@ionic/angular';
import { SlotService } from '../../services/slot/slot.service';
import { LinesService } from '../../services/lines/lines.service';
import { UserService } from '../../services/user/user.service';
import { AlertService } from '../../services/alert/alert.service';

@Component({
	selector: 'app-line-detail',
	templateUrl: './line-detail.page.html',
	styleUrls: ['./line-detail.page.scss'],
})
export class LineDetailPage {
	skeletons: any[] = newArray(30);
	line: any = {};
	slots: any[];
	slot: any = {};
	count: number;

	@ViewChild('lista') lista: IonList;

	constructor(
		public slotService: SlotService,
		public linesService: LinesService,
		public userService: UserService,
		private alertService: AlertService,
		public activatedRoute: ActivatedRoute,
		public alertController: AlertController
	) {
		this.activatedRoute.params.subscribe(param => {
			const id = param.id;
			this.linesService.getLine(id).subscribe((res: any) => {
				this.line = res.object;
				this.getSlots(this.line.lineId);
			});
		});
	}

	async openAddClient() {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: 'Agregar cliente',
			inputs: [
				{
					name: 'email',
					type: 'email',
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
						this.addClient(res.email);
					},
				},
			],
		});

		await alert.present();
	}

	getSlots(lineId: string, event?: any) {
		this.slotService.getSlotsActivesByLineId(lineId).subscribe((res: any) => {
			this.slots = res.object;
			this.count = res.count;
			this.slots.sort((a, b) => a.startDate - b.startDate);
			this.slots.forEach(slot => {
				slot.startDate = new Date(slot.startDate);
			});
			if (event) {
				event.target.complete();
			}
		});
	}

	attend(slot: any, attended: boolean) {
		slot.activeFg = 'N';
		slot.attendedFg = attended ? 'S' : 'N';
		slot.endDate = new Date().getTime();
		slot.startDate = slot.startDate.getTime();
		slot.lineId = slot.line.lineId;
		slot.userId = slot.user.userId;
		this.lista.closeSlidingItems();
		this.save(slot);
	}

	save(slot) {
		this.slotService.saveSlot(slot).subscribe((res: any) => {
			this.getSlots(this.line.lineId);
		});
	}

	addClient(email: string) {
		this.userService.getUserByEmail(email).subscribe(
			(res: any) => {
				const user = res.object;
				if (user) {
					this.slot = {
						userId: user.userId,
						lineId: this.line.lineId,
						activeFg: 'S',
						attendedFg: 'N',
						startDate: new Date().getTime(),
					};
					this.save(this.slot);
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
