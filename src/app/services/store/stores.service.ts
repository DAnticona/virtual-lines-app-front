import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserService } from '../user/user.service';
import { AlertService } from '../alert/alert.service';
import { HttpService } from '../http/http.service';
import { CONFIG_PATH } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  baseUrl = CONFIG_PATH;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private httpService: HttpService,
    private http: HttpClient
  ) {}

  getStores() {
    const url = `${this.baseUrl}/store`;

    return this.http.get(url, this.httpService.getHttpOptions());
  }

  getStoreById(id: string) {
    const url = `${this.baseUrl}/store/${id}`;

    return this.http.get(url, this.httpService.getHttpOptions()).pipe(
      map((res: any) => {
        this.updateStorage(res.object);
        return res;
      })
    );
  }

  updateStore(store: any) {
    const url = `${this.baseUrl}/store`;

    return this.http.post(url, store, this.httpService.getHttpOptions()).pipe(
      map((res: any) => {
        this.updateStorage(res.object);
        this.alertService.presentToast(`Datos actualizados`, 'success');
        return true;
      }),
      catchError(err => {
        console.log(err);
        this.alertService.presentAlert('Error', store.publicName, err.error.message);
        return throwError(err);
      })
    );
  }

  newStore(store: any) {
    const url = `${this.baseUrl}/register/store/new-store`;

    return this.http.post(url, store).pipe(
      map(res => {
        this.alertService.presentToast('Registro exitoso', 'success');
        return true;
      }),
      catchError(err => {
        console.log(err);
        this.alertService.presentAlert('Error', store.publicName, err.error.message);
        return throwError(err);
      })
    );
  }

  private updateStorage(store: any) {
    this.userService.user.store = store;
    this.userService.saveStorage(this.userService.user, this.userService.token);
  }
}
