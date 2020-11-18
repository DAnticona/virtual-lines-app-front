import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { CONFIG_PATH } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = CONFIG_PATH;
  user: any;

  constructor(public alertController: AlertController, private http: HttpClient) {}

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  getCategories() {
    const url = `${this.baseUrl}/register/category`;
    return this.http.get(url);
  }
}
