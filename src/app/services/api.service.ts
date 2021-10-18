import { HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetail, UserInfo } from '../object/AdminLogin';
import { Observable } from 'rxjs';
import { AppConfig, removeVietnameseTones } from '../config';
import { BeerDetail } from '../object/BeerDetail';
import { SearchQuery } from '../object/SearchQuery';
import { SearchResult } from '../object/SearchResult';
import { RequestService } from './request.service';

import { Md5 } from 'ts-md5/dist/md5';
import { OrderSearchResult, PackageOrder } from '../object/OrderSearchResult';
import { AppService } from './app.service';
import { ObjectID } from '../object/ObjectID';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  HostURL = AppConfig.BaseUrl;

  currentOrderResult: OrderSearchResult = null;

  constructor(
    private requestServices: RequestService,
    private appServices: AppService) { }

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

  public AdminGetDetail(cb: (result: UserDetail) => void) {

    return this.requestServices.get(`${this.HostURL}auth/me`).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('Detail result: ');
          console.log(event.body);
          cb(event.body);
        }
      },
      err => {
        console.log(err);
      });
  }

  private search(searchQuery: SearchQuery): Observable<HttpEvent<any>> {
    if (searchQuery.query === 'all') {
      return this.requestServices.post(`${this.HostURL}beer/admin/getall`, searchQuery)
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

  alredySearchOrder: boolean = false;
  public SearcOrder(searchQuery: SearchQuery, cb: (result: OrderSearchResult) => void) {

    this.appServices.registerOrder(cb);
    if (!this.alredySearchOrder) {
      this.alredySearchOrder = true;
      this.UpdateOrderList(searchQuery);
    }
  }

  public UpdateOrderList(searchQuery: SearchQuery) {
    this.requestServices.post(`${this.HostURL}order/admin/all`, searchQuery).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('order result: ');
          //console.log(event.body);
          this.currentOrderResult = event.body;
          this.appServices.changeOrder(event.body);
        }
      },
      err => {
        console.log(err);
      });
  }

  public RemoveOrder(id: string) {
    if (this.currentOrderResult !== null) {
      const removeID = this.currentOrderResult.result.findIndex(x => x.package_order_second_id === id);
      console.log(removeID);

      this.currentOrderResult.result.splice(removeID, 1);
      this.appServices.changeOrder(this.currentOrderResult);
    }
  }

  public GetOrderDetail(id: string, cb: (order: PackageOrder) => void) {
    if (this.currentOrderResult !== null) {
      let matchOrder = this.currentOrderResult.result.find(x => x.package_order_second_id === id);
      if (matchOrder) {
        cb(matchOrder);
        return;
      }
    }
    this.requestServices.get(`${this.HostURL}order/admin/detail/${id}`).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('order detail: ');
          cb(event.body);
        }
      },
      err => {
        console.log(err);
      });
  }

  public CloseOrder(id: string, cb: (order: PackageOrder) => void) {
    const closeorder: ObjectID = {
      id: id
    }
    this.requestServices.post(`${this.HostURL}order/admin/done`, closeorder).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('close order: ');
          console.log(event.body);

          cb(event.body);
        }
      },
      err => {
        console.log(err);
      });
  }

  //refresh admin token
  private refreshToken: boolean = false;
  public RefreshToken() {
    if (this.refreshToken)
      return;
    this.refreshToken = true;

    setInterval(() => {
      console.log('refresh token!');

      this.requestServices.post(`${this.HostURL}auth/refresh`, null).subscribe(
        event => {
          if (event instanceof HttpResponse) {
          }
        },
        err => {
          console.log(err);
        });

    }, 1000 * 60 * AppConfig.TimeRefresh); //Do this after 1 hour
  }

  //generate productID
  public GenerateProductID(cb: (string) => void) {
    this.requestServices.get(AppConfig.BaseUrl + 'beer/admin/generateid').subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event.body);
          cb(event.body.response);
        }
      },
      err => {
        console.log('Could not generate beer ID!');
        console.log(err);

      });
  }

  //create product
  public CreateOrUpdateProduct(submitData: BeerDetail, done: (any) => void, error: () => void) {

    this.requestServices.post(AppConfig.BaseUrl + 'beer/admin/create', submitData).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event.body);
          done(event.body);
        }
      },
      err => {
        console.log('Could not save beer!');
        console.log(err);
        error();
      });
  }

  public GetVoucher(cb: (vouchers) => void) {
    this.requestServices.post(AppConfig.BaseUrl + 'voucher/getall', {
      page: 0,
      size: 100
    }).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event.body);
          cb(event.body);
        }
      },
      err => {
        console.log('Could not get all Voucher!');
        console.log(err);

      });
  }

  public GetDeviceConfig(cb: (deviceConfig) => void, error: () => void) {
    this.requestServices.get(AppConfig.BaseUrl + 'deviceconfig/get').subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event.body);
          cb(event.body);
        }
      },
      err => {
        console.log('Could not get device config!');
        console.log(err);
        error();
      });

  }

  public SaveDeviceColor(colorConfig: any, cb: () => void, error: () => void) {
    this.requestServices.post(AppConfig.BaseUrl + 'deviceconfig/admin/changecolor', colorConfig).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event.body);
          cb();
        }
      },
      err => {
        console.log('Could not save color!');
        console.log(err);
        error();
      });
  }

  public GetShippingProvider(providerID: string, cb: (any) => void, error: () => void) {

    this.requestServices.get(AppConfig.BaseUrl + 'shippingprovider/admin/get/' + providerID).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event.body);
          cb(event.body);
        }
      },
      err => {
        console.log('Could not get ship provider!');
        console.log(err);
        error();
      });
  }

  public SaveShipProvider(submitData: any, cb: ()=>void, error: ()=>void){
    this.requestServices.post(AppConfig.BaseUrl+'shippingprovider/admin/update', submitData)
    .subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event.body);
          cb();
        }
      },
      err => {
        console.log('Could not save shipping provider!');
        console.log(err);
        error();
      });
  }
}
