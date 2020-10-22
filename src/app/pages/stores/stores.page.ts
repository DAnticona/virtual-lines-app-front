import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { StoresService } from '../../services/store/stores.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
})
export class StoresPage implements OnInit {
  stores: Observable<any>;

  @ViewChild('lista') lista: IonList;
  constructor(public storeService: StoresService, private toastController: ToastController) {}

  ngOnInit() {
    this.stores = this.storeService.getStores();
    console.log(this.stores);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

  favorite(user) {
    this.presentToast('Guardó en favoritos');
    this.lista.closeSlidingItems();
  }
  share(user) {
    this.presentToast('Compartido');
    this.lista.closeSlidingItems();
  }
  borrar(user) {
    this.presentToast('Borrado');
    this.lista.closeSlidingItems();
  }
}
