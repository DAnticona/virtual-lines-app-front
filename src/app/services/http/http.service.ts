import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  token: string;

  constructor() {
    this.token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
  }

  getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `${this.token}`,
        'Content-Type': 'application/json',
      }),
    };

    return httpOptions;
  }
}
