import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { CONFIG_PATH } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
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

  getRolesStore() {
    const url = `${this.baseUrl}/role/store`;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `${this.userService.user.token}`,
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get(url, httpOptions).pipe(
      map((res: any) => {
        return res.object;
      })
    );
  }
}
