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
export class LinesService {
  baseUrl = CONFIG_PATH;

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private alertService: AlertService
  ) {}

  getLine(id: string) {
    const url = `${this.baseUrl}/line/${id}`;

    return this.http.get(url, this.httpService.getHttpOptions());
  }

  getLinesByStoreId(id: string) {
    const url = `${this.baseUrl}/line/store/${id}`;

    return this.http.get(url, this.httpService.getHttpOptions());
  }

  newLine(line: any) {
    const url = `${this.baseUrl}/line`;

    return this.http.post(url, line, this.httpService.getHttpOptions()).pipe(
      map(() => {
        const message = line.lineId
          ? `Fila: ${line.name} elimnada exitosamente`
          : `Fila: ${line.name} registrada exitosamente`;

        this.alertService.presentToast(message, 'success');
        return true;
      }),
      catchError(err => {
        console.log(err);
        this.alertService.presentAlert('Error', line.name, err.error.message);
        return throwError(err);
      })
    );
  }

  deleteLine(id: string) {
    const url = `${this.baseUrl}/line/${id}`;

    return this.http.delete(url, this.httpService.getHttpOptions()).pipe(
      map(res => {
        this.alertService.presentToast(`Fila eliminada exitosamente`, 'success');
        return true;
      }),
      catchError(err => {
        console.log(err);
        this.alertService.presentAlert('Error', 'Fila no eliminada', err.error.message);
        return throwError(err);
      })
    );
  }
}
