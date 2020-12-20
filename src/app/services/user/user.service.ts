import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CONFIG_PATH } from '../../config/config';
import { AlertService } from '../alert/alert.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = CONFIG_PATH;
  user: any;
  token: string;

  constructor(
    public httpService: HttpService,
    private alertService: AlertService,
    private http: HttpClient,
    private router: Router
  ) {
    this.loadStorage();
  }

  loadStorage() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.token = localStorage.getItem('token');
  }

  saveStorage(user: any, token: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.user = user;
    this.token = token;
  }

  isLogged() {
    return true;
  }

  login(user: any) {
    const url = `${this.baseUrl}/login`;

    return this.http.post(url, user).pipe(
      map((res: any) => {
        this.user = res.object;
        this.token = res.object.token;
        this.saveStorage(this.user, this.token);
        return res;
      }),
      catchError(err => {
        console.log(err);
        this.alertService.presentAlert('Error', user.email, err.error.message);
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
      map(() => {
        this.alertService.presentToast('Registro exitoso', 'success');
        return true;
      }),
      catchError(err => {
        console.log(err);
        this.alertService.presentAlert('Error', user.email, err.error.message);
        return throwError(err);
      })
    );
  }

  newStoreUser(user: any) {
    const url = `${this.baseUrl}/user`;

    return this.http.post(url, user, this.httpService.getHttpOptions()).pipe(
      map(() => {
        this.alertService.presentToast('Registro exitoso', 'success');
        return true;
      }),
      catchError(err => {
        console.log(err);
        this.alertService.presentAlert('Error', user.email, err.error.message);
        return throwError(err);
      })
    );
  }

  updateUser(user: any) {
    const url = `${this.baseUrl}/user`;

    return this.http.post(url, user, this.httpService.getHttpOptions()).pipe(
      map((res: any) => {
        this.alertService.presentToast('Registro exitoso', 'success');
        this.updateStorage(res.object);
        return true;
      }),
      catchError(err => {
        console.log(err);
        this.alertService.presentAlert('Error', user.email, err.error.message);
        return throwError(err);
      })
    );
  }

  changePassword(user: any) {
    const url = `${this.baseUrl}/user/password`;

    return this.http.post(url, user, this.httpService.getHttpOptions()).pipe(
      map(() => {
        this.alertService.presentToast('Registro exitoso', 'success');
        return true;
      }),
      catchError(err => {
        console.log(err);
        this.alertService.presentAlert('Error', user.email, err.error.message);
        return throwError(err);
      })
    );
  }

  getUsersByStoreId(id: string) {
    const url = `${this.baseUrl}/store/${id}/users`;

    return this.http.get(url, this.httpService.getHttpOptions());
  }

  getUserByEmail(email: string) {
    const url = `${this.baseUrl}/user/${email}`;

    return this.http.get(url, this.httpService.getHttpOptions()).pipe(
      map((res: any) => {
        this.updateStorage(res.object);
        return res;
      })
    );
  }

  private updateStorage(user: any) {
    if (user.userId === this.user.userId) {
      this.user = user;
      this.saveStorage(user, this.token);
    }
  }
}
