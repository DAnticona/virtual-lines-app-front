import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CONFIG_PATH } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = CONFIG_PATH;
  user: any;

  constructor(public alertController: AlertController, private http: HttpClient, private router: Router) {
    this.loadStorage();
  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header,
      subHeader,
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
        this.presentAlert('Error', user.email, err.error.message);
        return throwError(err);
      })
    );
  }

  logout() {
    this.user = null;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  newUser(user: any) {
    const url = `${this.baseUrl}/register/user/new-client-user`;

    return this.http.post(url, user).pipe(
      map(res => {
        this.presentAlert('Muy Bien', user.email, 'Registro exitoso');
        if (user.userId === this.user.userId) {
          this.saveStorage(user);
        }
        return true;
      }),
      catchError(err => {
        console.log(err);
        this.presentAlert('Error', user.email, err.error.message);
        return throwError(err);
      })
    );
  }

  newStoreUser(user: any) {
    const url = `${this.baseUrl}/user`;

    return this.http.post(url, user, this.getHeaders()).pipe(
      map(res => {
        this.presentAlert('Muy Bien', user.email, 'Registro exitoso');
        return true;
      }),
      catchError(err => {
        console.log(err);
        this.presentAlert('Error', user.email, err.error.message);
        return throwError(err);
      })
    );
  }

  changePassword(user: any) {
    const url = `${this.baseUrl}/user/password`;

    return this.http.post(url, user, this.getHeaders()).pipe(
      map(res => {
        this.presentAlert('Muy Bien', user.email, 'Registro exitoso');
        return true;
      }),
      catchError(err => {
        console.log(err);
        this.presentAlert('Error', user.email, err.error.message);
        return throwError(err);
      })
    );
  }

  getUsersByStoreId(id: string) {
    const url = `${this.baseUrl}/store/${id}/users`;

    return this.http.get(url, this.getHeaders());
  }

  getUserByEmail(email: string) {
    const url = `${this.baseUrl}/user/${email}`;

    return this.http.get(url, this.getHeaders());
  }

  private getHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `${this.user.token}`,
        'Content-Type': 'application/json',
      }),
    };

    return httpOptions;
  }
}
