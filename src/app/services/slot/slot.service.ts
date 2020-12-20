import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AlertService } from '../alert/alert.service';
import { HttpService } from '../http/http.service';
import { CONFIG_PATH } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class SlotService {
  baseUrl = CONFIG_PATH;

  constructor(
    private alertService: AlertService,
    private httpService: HttpService,
    private http: HttpClient
  ) {}

  getSlotsActivesByLineId(id: string) {
    const url = `${this.baseUrl}/slot/line/${id}`;

    return this.http.get(url, this.httpService.getHttpOptions());
  }

  getSlotActiveByLineIdUserId(lineId: string, userId: string) {
    const url = `${this.baseUrl}/slot/line/${lineId}/user/${userId}`;

    return this.http.get(url, this.httpService.getHttpOptions());
  }

  saveSlot(slot: any) {
    const url = `${this.baseUrl}/slot`;

    return this.http.post(url, slot, this.httpService.getHttpOptions()).pipe(
      map(() => {
        this.alertService.presentToast(`Datos actualizados`, 'success');
        return true;
      }),
      catchError(err => {
        console.log(err);
        this.alertService.presentAlert('Error', 'slot.user.name', err.error.message);
        return throwError(err);
      })
    );
  }
}
