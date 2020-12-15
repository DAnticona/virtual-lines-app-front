import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { CONFIG_PATH } from '../../config/config';
import { throwError } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  baseUrl = CONFIG_PATH;

  constructor(
    public alertController: AlertController,
    private toastController: ToastController,
    private http: HttpClient,
    private userService: UserService
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

  getStores() {
    const url = `${this.baseUrl}/store`;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `${this.userService.user.token}`,
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get(url, httpOptions);
  }

  getStoreById(id: string) {
    const url = `${this.baseUrl}/store/${id}`;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `${this.userService.user.token}`,
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get(url, httpOptions);
  }

  updateStore(store: any) {
    const url = `${this.baseUrl}/store`;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `${this.userService.user.token}`,
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(url, store, httpOptions).pipe(
      map(res => {
        this.presentToast(`Datos actualizados`);
        return true;
      }),
      catchError(err => {
        console.log(err);
        this.presentAlert('Error', store.publicName, err.error.message);
        return throwError(err);
      })
    );
  }

  newStore(store: any) {
    const url = `${this.baseUrl}/register/store/new-store`;

    return this.http.post(url, store).pipe(
      map(res => {
        this.presentAlert('Muy Bien', store.publicName, 'Registro exitoso');
        return true;
      }),
      catchError(err => {
        console.log(err);
        this.presentAlert('Error', store.publicName, err.error.message);
        return throwError(err);
      })
    );
  }
}
