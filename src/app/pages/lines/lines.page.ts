import { Component, ViewChild } from '@angular/core';
import { newArray } from '@angular/compiler/src/util';
import { AlertController, IonList } from '@ionic/angular';
import { LinesService } from '../../services/lines/lines.service';
import { UserService } from '../../services/user/user.service';
import { SlotService } from '../../services/slot/slot.service';
import { AlertService } from '../../services/alert/alert.service';

@Component({
	selector: 'app-lines',
	templateUrl: './lines.page.html',
	styleUrls: ['./lines.page.scss'],
})
export class LinesPage {
	skeletons: any[] = newArray(30);
	lines: any[];
	line: any;
	store: any;
	count: number;

	@ViewChild('lista') lista: IonList;

	constructor(
		public linesService: LinesService,
		public userService: UserService,
		public slotService: SlotService,
		public alertController: AlertController,
		private alertSerice: AlertService
	) {
		this.store = this.userService.user.store;
		this.getLines();
	}

	getLines(event?: any) {
		this.linesService.getLinesByStoreId(this.store.storeId).subscribe((res: any) => {
			const lines = res.object;
			this.count = res.count;
			this.lines = [];
			lines.forEach(line => {
				this.slotService.getSlotsActivesByLineId(line.lineId).subscribe((res1: any) => {
					line.slotsNumber = res1.count;
					this.lines.push(line);
					this.lines.sort((a, b) => (a.name < b.name ? -1 : 1));
				});
			});
			if (event) {
				event.target.complete();
			}
		});
	}

	async newLine() {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: 'Nueva Fila',
			inputs: [
				{
					name: 'lineName',
					type: 'text',
					placeholder: 'Nombre de la fila',
				},
			],
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						this.line = null;
					},
				},
				{
					text: 'Ok',
					handler: res => {
						if (!res.lineName) {
							return;
						}
						this.line = {
							name: res.lineName,
							storeId: this.store.storeId,
							activeFg: 'S',
						};
						this.save(this.line);
					},
				},
			],
		});

		await alert.present();
	}

	delete(line: any) {
		this.lista.closeSlidingItems();
		if (line.slotsNumber > 0) {
			this.alertSerice.presentAlert('¡Error!', 'No puede eliminar esta fila', 'Existen usuarios esperando');
			return;
		}
		line.activeFg = 'N';
		line.storeId = this.store.storeId;
		this.save(line);
	}

	save(line: any) {
		this.linesService.newLine(line).subscribe((res: any) => {
			this.getLines();
		});
	}
}
