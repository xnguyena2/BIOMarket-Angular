import { Injectable } from '@angular/core';

import { AppConfig } from '../config'
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DeviceConfigData } from '../setting/setting.component';

@Injectable({
  providedIn: 'root'
})
export class DeviceconfigService {

  private baseUrl = AppConfig.BaseUrl+'deviceconfig/';
  constructor(private http: HttpClient) { }


  getDeviceConfig(): Observable<HttpEvent<any>> {

    const req = new HttpRequest('GET', `${this.baseUrl+"get"}`, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  changeDeviceConfig(submitData: DeviceConfigData): Observable<HttpEvent<any>> {

    const req = new HttpRequest('POST', `${this.baseUrl+"changecolor"}`, submitData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
