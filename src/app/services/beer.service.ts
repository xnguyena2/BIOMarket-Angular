import { Injectable } from '@angular/core';

import { AppConfig } from '../config'
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BeerDetail } from '../beer-detail/beer-detail.component';

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

  submitBeer(submitData: BeerDetail): Observable<HttpEvent<any>> {

    const req = new HttpRequest('POST', `${this.baseUrl+"create"}`, submitData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
