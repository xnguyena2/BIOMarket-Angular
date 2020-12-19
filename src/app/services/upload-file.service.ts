import { Injectable } from '@angular/core';

import { AppConfig } from '../config'
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private baseUrl = AppConfig.BaseUrl;
  constructor(private http: HttpClient) { }

  upload(file: File, path: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl+path}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFile(path: string): Observable<HttpEvent<any>> {

    const req = new HttpRequest('GET', `${this.baseUrl+path}`, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  deleteFile(path: string, imgID: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('img', imgID);

    const req = new HttpRequest('POST', `${this.baseUrl+path}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

}
