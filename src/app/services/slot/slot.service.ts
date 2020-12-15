import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { CONFIG_PATH } from '../../config/config';
import { AlertController, ToastController } from '@ionic/angular';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SlotService {
  baseUrl = CONFIG_PATH;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    public alertController: AlertController,
    private toastController: ToastController
  ) {}

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      color: 'success',
      message,
      duration: 2000,
    });
    toast.present();
  }

  getSlotsActivesByLineId(id: string) {
    const url = `${this.baseUrl}/slot/line/${id}`;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `${this.userService.user.token}`,
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get(url, httpOptions);
  }

  getSlotActiveByLineIdUserId(lineId: string, userId: string) {
    const url = `${this.baseUrl}/slot/line/${lineId}/user/${userId}`;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `${this.userService.user.token}`,
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get(url, httpOptions);
  }

  saveSlot(slot: any) {
    const url = `${this.baseUrl}/slot`;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `${this.userService.user.token}`,
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(url, slot, httpOptions).pipe(
      map(res => {
        this.presentToast(`Datos actualizados`);
        return true;
      }),
      catchError(err => {
        console.log(err);
        this.presentAlert('Error', 'slot.user.name', err.error.message);
        return throwError(err);
      })
    );
  }
}
