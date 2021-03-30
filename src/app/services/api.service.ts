import { HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from '../object/AdminLogin';
import { Observable } from 'rxjs';
import { AppConfig, removeVietnameseTones } from '../config';
import { BeerDetail } from '../object/BeerDetail';
import { SearchQuery } from '../object/SearchQuery';
import { SearchResult } from '../object/SearchResult';
import { RequestService } from './request.service';

import {Md5} from 'ts-md5/dist/md5';
import { OrderSearchResult } from '../object/OrderSearchResult';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  HostURL = AppConfig.BaseUrl;

  constructor(
    private requestServices: RequestService,) { }

    public AdminLogin(user: UserInfo, cb: (result: boolean) => void) {
      const md5 = new Md5();
      let password = md5.appendStr(user.password).end().toString().toUpperCase();
      console.log(password);
      user.password = password;

      return this.requestServices.post(`${this.HostURL}auth/signin`, user).subscribe(
        event => {
          if (event instanceof HttpResponse) {
            console.log('login result: ');
            console.log(event.body);
            cb(true);
          }
        },
        err => {
          console.log(err);
          cb(false);
        });
    }

  private search(searchQuery: SearchQuery): Observable<HttpEvent<any>> {
    if (searchQuery.query === 'all') {
      return this.requestServices.post(`${this.HostURL}beer/getall`, searchQuery)
    } else if (AppConfig.CatetoryDrop.filter(c => c.value === searchQuery.query).length > 0) {
      return this.requestServices.post(`${this.HostURL}beer/category`, searchQuery)
    }
    else {
      searchQuery.query = removeVietnameseTones(searchQuery.query);
      return this.requestServices.post(`${this.HostURL}beer/search`, searchQuery);
    }
  }

  public SearchBeer(searchQuery: SearchQuery, cb: (result: SearchResult) => void) {
    this.search(searchQuery).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('search result: ');
          console.log(event.body);
          cb(event.body);
        }
      },
      err => {
        console.log(err);
        cb(new SearchResult());
      });
  }

  public GetProductDetail(productID: string, cb: (p?: BeerDetail) => void) {
    this.requestServices.get(`${this.HostURL}beer/detail/${productID}`).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('load beer detail: ');
          console.log(event.body);
          cb(event.body);
        }
      },
      err => {
        console.log(err);
        cb(undefined);
      });
  }

  public Delete(productID: string, cb: (success: boolean) => void) {
    this.requestServices.delete(`${this.HostURL}beer/admin/delete/${productID}`).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('delete Productl: ');
          console.log(event.body);
          cb(true);
        }
      },
      err => {
        console.log(err);
        cb(false);
      });
  }

  public SearcOrder(searchQuery: SearchQuery, cb: (result: OrderSearchResult) => void) {

    return this.requestServices.post(`${this.HostURL}order/admin/all`, searchQuery).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('order result: ');
          console.log(event.body);
          cb(event.body);
        }
      },
      err => {
        console.log(err);
        cb(null);
      });
  }
}
