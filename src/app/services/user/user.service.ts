import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ConfigService } from '../config/config.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: any;
  user: any;

  constructor(
    public alertController: AlertController,
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router
  ) {
    this.configService.getConfig().subscribe((res: any) => {
      this.baseUrl = res.baseUrl;
    });

    this.loadStorage();
  }

  async presentAlert(email: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: email,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  loadStorage() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  saveStorage(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  isLogged() {
    return true;
  }

  login(user: any) {
    const url = `${this.baseUrl}/login`;

    return this.http.post(url, user).pipe(
      map((res: any) => {
        this.user = res.object;
        if (!this.user.image) {
          this.user.image = 'assets/image/users/noimage2.jpg';
        }
        this.saveStorage(this.user);
        return res;
      }),
      catchError(err => {
        console.log(err);
        this.presentAlert(user.email, err.error.message);
        return throwError(err);
      })
    );
  }

  logout() {
    this.user = null;
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }
}
