import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(public alertController: AlertController, public toastController: ToastController) {}

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentToast(message: string, color: string, duration = 2000) {
    const toast = await this.toastController.create({
      position: 'top',
      color,
      message,
      duration,
    });
    toast.present();
  }
}
