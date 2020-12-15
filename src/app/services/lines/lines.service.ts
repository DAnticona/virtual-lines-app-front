import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { CONFIG_PATH } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { AlertController, ToastController } from '@ionic/angular';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LinesService {
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

  getLine(id: string) {
    const url = `${this.baseUrl}/line/${id}`;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `${this.userService.user.token}`,
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get(url, httpOptions);
  }

  getLinesByStoreId(id: string) {
    const url = `${this.baseUrl}/line/store/${id}`;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `${this.userService.user.token}`,
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get(url, httpOptions);
  }

  newLine(line: any) {
    const url = `${this.baseUrl}/line`;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `${this.userService.user.token}`,
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(url, line, httpOptions).pipe(
      map(res => {
        this.presentToast(`Fila: ${line.name} registrada exitosamente`);
        return true;
      }),
      catchError(err => {
        console.log(err);
        this.presentAlert('Error', line.name, err.error.message);
        return throwError(err);
      })
    );
  }

  deleteLine(id: string) {
    const url = `${this.baseUrl}/line/${id}`;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `${this.userService.user.token}`,
        'Content-Type': 'application/json',
      }),
    };

    return this.http.delete(url, httpOptions).pipe(
      map(res => {
        this.presentToast(`Fila eliminada exitosamente`);
        return true;
      }),
      catchError(err => {
        console.log(err);
        this.presentAlert('Error', 'Fila no eliminada', err.error.message);
        return throwError(err);
      })
    );
  }
}
