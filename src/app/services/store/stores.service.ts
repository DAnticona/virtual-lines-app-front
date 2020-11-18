import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
