import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StoresService } from '../../../services/store/stores.service';
import { LinesService } from '../../../services/lines/lines.service';
import { SlotService } from '../../../services/slot/slot.service';
import { UserService } from '../../../services/user/user.service';

@Component({
	selector: 'app-lines-tab',
	templateUrl: './lines-tab.page.html',
	styleUrls: ['./lines-tab.page.scss'],
})
export class LinesTabPage {
	store: any = {};
	slot: any = {};
	lines: any[] = [];
	linesNumber: number;
	map = null;
	markers = [];
	count: number;

	constructor(
		public storeService: StoresService,
		public lineService: LinesService,
		public slotService: SlotService,
		public userService: UserService,
		public alertController: AlertController
	) {
		const storeId = localStorage.getItem('storeId') || null;
		this.getStore(storeId);
	}

	getStore(storeId: string, event?: any) {
		this.storeService.getStoreById(storeId).subscribe((res: any) => {
			this.store = res.object;
			this.lineService.getLinesByStoreId(storeId).subscribe((res1: any) => {
				const lines = res1.object;
				this.lines = [];
				this.linesNumber = res1.count;
				if (this.linesNumber > 0) {
					lines.forEach(line => {
						this.slotService
							.getSlotActiveByLineIdUserId(line.lineId, this.userService.user.userId)
							.subscribe((res2: any) => {
								line.isExists = !!res2.object;

								if (line.isExists) {
									const slot = res2.object;
									line.clientsCount = slot.countBefore;
								}
								this.lines.push(line);
								this.lines.sort((a, b) => (a.name < b.name ? -1 : 1));

								if (event) {
									event.target.complete();
								}
							});
					});
				} else if (event) {
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
					text: 'Entrar',
					handler: () => {
						this.save();
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
					text: 'Dejar la fila',
					handler: () => {
						this.slot.attendedFg = 'N';
						this.save();
					},
				},
				{
					text: 'Ya me atendieron',
					handler: () => {
						this.slot.attendedFg = 'S';
						this.save();
					},
				},
			],
		});

		await alert.present();
	}

	inOut(line: any) {
		this.slotService
			.getSlotActiveByLineIdUserId(line.lineId, this.userService.user.userId)
			.subscribe((res: any) => {
				const isExists = !!res.object;
				if (isExists) {
					this.slot = res.object;
					this.slot.userId = this.userService.user.userId;
					this.slot.lineId = line.lineId;
					this.slot.activeFg = 'N';
					this.slot.endDate = new Date().getTime();
					this.presentAlertOut(line.name, '¡Ya estás en esta fila!', '¿Quieres salir?');
				} else {
					this.slot = {};
					this.slot.userId = this.userService.user.userId;
					this.slot.lineId = line.lineId;
					this.slot.activeFg = 'S';
					this.slot.attendedFg = 'N';
					this.slot.startDate = new Date().getTime();
					this.presentAlertIn(line.name, null, '¿Quieres entrar a esta fila?');
				}
			});
	}

	save() {
		this.slotService.saveSlot(this.slot).subscribe((res: any) => {
			this.getStore(this.store.storeId);
		});
	}
}
