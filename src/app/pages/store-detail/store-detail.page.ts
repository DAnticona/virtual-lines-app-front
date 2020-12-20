import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StoresService } from '../../services/store/stores.service';
import { LinesService } from '../../services/lines/lines.service';
import { SlotService } from '../../services/slot/slot.service';
import { UserService } from '../../services/user/user.service';

declare var google: any;

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.page.html',
  styleUrls: ['./store-detail.page.scss'],
})
export class StoreDetailPage {
  store: any = {};
  slot: any = {};
  lines: any[] = [];
  linesNumber: number;
  map = null;
  markers = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public storeService: StoresService,
    public lineService: LinesService,
    public slotService: SlotService,
    public userService: UserService,
    public alertController: AlertController
  ) {
    this.activatedRoute.params.subscribe(params => {
      const storeId = params.id;
      this.getStore(storeId);
    });
  }

  loadMap() {
    const mapElement: HTMLElement = document.getElementById('map');

    const initialLocation = { lat: this.store.latitude, lng: this.store.longitude };

    this.map = new google.maps.Map(mapElement, {
      center: initialLocation,
      zoom: 12,
    });

    this.addMarker(initialLocation);
  }

  addMarker(location) {
    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
    });
    this.markers.push(marker);
  }

  getStore(storeId: string, event?: any) {
    this.storeService.getStoreById(storeId).subscribe((res: any) => {
      this.store = res.object;
      this.loadMap();
      this.lineService.getLinesByStoreId(storeId).subscribe((res1: any) => {
        const lines = res1.object;
        this.lines = [];
        this.linesNumber = res1.count;
        if (this.linesNumber > 0) {
          lines.forEach(line => {
            this.slotService
              .getSlotActiveByLineIdUserId(line.lineId, this.userService.user.userId)
              .subscribe((res2: any) => {
                const isExists = !!res2.object;
                if (isExists) {
                  line.isExists = true;
                } else {
                  line.isExists = false;
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
