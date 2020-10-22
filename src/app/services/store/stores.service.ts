import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  constructor(
    public alertController: AlertController,
    private http: HttpClient,
    private configService: ConfigService
  ) {}

  async presentAlert(email: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: email,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  getStores() {
    // const url = `${this.baseUrl}/login`;
    const url = 'https://fakestoreapi.com/products';

    // const httpOptions = {
    // 	headers: new HttpHeaders({
    // 		Authorization: `bearer ${this.usuarioService.token}`,
    // 		'Content-Type': 'application/json',
    // 	}),
    // };

    return this.http.get(url);
  }
}
