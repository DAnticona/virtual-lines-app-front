import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG_PATH } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  configPath = CONFIG_PATH;

  constructor(private http: HttpClient) {}

  getConfig() {
    return this.http.get(this.configPath);
  }
}
