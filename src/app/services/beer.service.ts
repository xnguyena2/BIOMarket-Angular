import { Injectable } from '@angular/core';

import { AppConfig } from '../config'
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  private baseUrl = AppConfig.BaseUrl+'beer/';
  constructor(private http: HttpClient) { }


  getBeerID(): Observable<HttpEvent<any>> {

    const req = new HttpRequest('GET', `${this.baseUrl+"generateid"}`, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
