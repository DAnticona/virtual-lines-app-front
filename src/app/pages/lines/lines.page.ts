import { Component, OnInit, ViewChild } from '@angular/core';
import { newArray } from '@angular/compiler/src/util';
import { AlertController, ToastController, IonList } from '@ionic/angular';
import { LinesService } from '../../services/lines/lines.service';
import { UserService } from '../../services/user/user.service';
import { SlotService } from '../../services/slot/slot.service';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.page.html',
  styleUrls: ['./lines.page.scss'],
})
export class LinesPage implements OnInit {
  skeletons: any[] = newArray(30);
  lines: any[];
  line: any;
  newLineName: string;
  store: any;

  @ViewChild('lista') lista: IonList;

  constructor(
    public linesService: LinesService,
    public userService: UserService,
    public slotService: SlotService,
    public alertController: AlertController,
    private toastController: ToastController
  ) {
    this.store = this.userService.user.store;
    this.getLines();
  }

  getLines() {
    this.linesService.getLinesByStoreId(this.store.storeId).subscribe((res: any) => {
      const lines = res.object;
      this.lines = [];
      lines.forEach(line => {
        this.slotService.getSlotsActivesByLineId(line.lineId).subscribe((res1: any) => {
          line.slotsNumber = res1.count;
          this.lines.push(line);
          this.lines.sort((a, b) => (a.name < b.name ? -1 : 1));
        });
      });
    });
  }

  ngOnInit() {}

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
            this.newLineName = null;
            console.log(this.newLineName);
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
            console.log(this.line);
            this.save(this.line);
          },
        },
      ],
    });

    await alert.present();
  }

  // async presentAlert(header: string, subHeader: string, message: string) {
  //   const alert = await this.alertController.create({
  //     header,
  //     subHeader,
  //     message,
  //     buttons: ['OK'],
  //   });

  //   await alert.present();
  // }

  // async presentToast(message: string) {
  //   const toast = await this.toastController.create({
  //     message,
  //     duration: 2000,
  //   });
  //   toast.present();
  // }

  delete(line: any) {
    this.lista.closeSlidingItems();
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
