import { HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetail, UserEntity, UserInfo } from '../object/AdminLogin';
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
import { UpdatePassword } from '../object/UpdatePassword';
import { Buyer } from '../object/Buyer';
import { VoucherData } from '../list-voucher/list-voucher.component';
import { StreamService } from './stream.service';
import { ProductImport } from '../object/ProductImport';
import { ProductOrder } from '../object/ProductOrder';
import { TotalOrder } from '../object/TotalOrder';
import { AppNotification } from '../object/Notification';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  HostURL = AppConfig.BaseUrl;

  currentOrderResult: OrderSearchResult = null;
  newOrderResult: OrderSearchResult = null;

  currentVoucher: VoucherData[] = null;

  constructor(
    private requestServices: RequestService,
    private appServices: AppService,
    private stream: StreamService) { }

  formaPass(us: UpdatePassword) {

    if (us.oldpassword && us.oldpassword != '') {
      us.oldpassword = new Md5().appendStr(us.oldpassword).end().toString().toUpperCase();
    }

    if (us.newpassword && us.newpassword != '') {
      us.newpassword = new Md5().appendStr(us.newpassword).end().toString().toUpperCase();
    }

  }

  public Stream() {
    this.stream.GetServerSentEvent(`${this.HostURL}stream/admin/order`).subscribe(newOrder => {
      this.AddNewOrder(newOrder);
      this.appServices.haveNewOrderer('(Đơn Hàng Mới!!!!)');
      console.log(newOrder);
    }, err => {
      console.log(err);
      this.appServices.changeNotification('Lost connect to server, please refresh page!!!!!');
      setTimeout(() => {
        this.Stream();
      }, 3000);
    });
  }

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

  public Logout(cb: (success: boolean) => void) {

    return this.requestServices.post(`${this.HostURL}auth/account/logout`, null).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('Logout user result: ');
          console.log(event.body);
          cb(true);
        }
      },
      err => {
        console.log(err);
        cb(false);
      });
  }

  public AdminGetAllProductImport(subPath: string, searchQuery: SearchQuery, cb: (result: ProductImport[]) => void) {

    return this.requestServices.post(`${this.HostURL}productimport/admin/${subPath}`, searchQuery).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('all product import result: ');
          console.log(event.body);
          cb(event.body);
        }
      },
      err => {
        console.log(err);
      });
  }

  public AdminGetAllProductOrder(subPath: string, searchQuery: SearchQuery, cb: (result: ProductOrder[]) => void) {

    return this.requestServices.post(`${this.HostURL}statistic/admin/${subPath}`, searchQuery).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('all product order result: ');
          console.log(event.body);
          cb(event.body);
        }
      },
      err => {
        console.log(err);
      });
  }

  public AdminGetTotalOrder(searchQuery: SearchQuery, cb: (result: TotalOrder) => void) {

    return this.requestServices.post(`${this.HostURL}statistic/admin/gettotal`, searchQuery).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('all total order result: ');
          console.log(event.body);
          cb(event.body);
        }
      },
      err => {
        console.log(err);
      });
  }

  public AdminCreateProductImport(newProduct: ProductImport, cb: (result: boolean) => void) {

    return this.requestServices.post(`${this.HostURL}productimport/admin/create`, newProduct).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('create product import result: ');
          console.log(event.body);
          cb(true);
        }
      },
      err => {
        console.log(err);
        cb(false);
      });
  }

  public DeleteProductImport(productID: string, cb: (success: boolean) => void) {
    this.requestServices.delete(`${this.HostURL}productimport/admin/delete/${productID}`).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('delete product importance: ');
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

  public AdminGetAllUser(searchQuery: SearchQuery, cb: (result: SearchResult<UserEntity>) => void) {

    return this.requestServices.post(`${this.HostURL}account/admin/getall`, searchQuery).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('all user result: ');
          console.log(event.body);
          cb(event.body);
        }
      },
      err => {
        console.log(err);
      });
  }

  public AdminUpdatePassUser(newUser: UpdatePassword, cb: (success: boolean) => void) {

    this.formaPass(newUser);
    return this.requestServices.post(`${this.HostURL}auth/account/update`, newUser).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('Update user result: ');
          console.log(event.body);
          cb(true);
        }
      },
      err => {
        console.log(err);
        cb(false);
      });
  }

  public AdminCreateUser(newUser: UpdatePassword, cb: (success: boolean) => void) {

    this.formaPass(newUser);
    return this.requestServices.post(`${this.HostURL}auth/admin/account/create`, newUser).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('create user result: ');
          console.log(event.body);
          cb(true);
        }
      },
      err => {
        console.log(err);
        cb(false);
      });
  }

  public AdminDeleteUser(newUser: UpdatePassword, cb: (success: boolean) => void, isSelfDelete: boolean) {

    this.formaPass(newUser);
    let path = isSelfDelete ? `${this.HostURL}auth/account/delete` : `${this.HostURL}auth/admin/account/delete`;
    return this.requestServices.post(path, newUser).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('delete user result: ');
          console.log(event.body);
          cb(true);
        }
      },
      err => {
        console.log(err);
        cb(false);
      });
  }

  public AdminGetAllBuyer(searchQuery: SearchQuery, cb: (result: Buyer[] | null) => void) {
    return this.requestServices.post(`${this.HostURL}buyer/admin/getall`, searchQuery).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('get all buyer result: ');
          console.log(event.body);
          cb(event.body);
        }
      },
      err => {
        console.log(err);
        cb(null);
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

  public SearchBeer(searchQuery: SearchQuery, cb: (success: boolean, result: SearchResult<BeerDetail>) => void) {
    this.search(searchQuery).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('search result: ');
          console.log(event.body);
          cb(true, event.body);
        }
      },
      err => {
        console.log(err);
        cb(false, new SearchResult());
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

  public GetNewListOrder() {
    return this.newOrderResult;
  }

  public UpdateOrderList(searchQuery: SearchQuery) {
    this.requestServices.post(`${this.HostURL}order/admin/all`, searchQuery).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('order result: ');
          //console.log(event.body);
          this.currentOrderResult = event.body;
          this.newOrderResult = null;
          this.appServices.changeOrder(event.body);
        }
      },
      err => {
        console.log(err);
      });
  }

  public AddNewOrder(newOrder: PackageOrder) {
    if (this.newOrderResult === null) {
      this.newOrderResult = {
        count: 1,
        result: [newOrder]
      }
    } else {
      const existID = this.newOrderResult.result.findIndex(x => x.package_order_second_id === newOrder.package_order_second_id);
      if (existID >= 0) {
        return
      }
      this.newOrderResult.count++;
      this.newOrderResult.result.push(newOrder);
    }
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

  public CloseOrder(id: string, status: string, cb: (order: PackageOrder) => void) {
    const closeorder = {
      id: id,
      status: status
    }
    this.requestServices.post(`${this.HostURL}order/admin/close`, closeorder).subscribe(
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
  public GenerateID(cb: (string) => void) {
    this.requestServices.get(AppConfig.BaseUrl + 'util/admin/generateid').subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event.body);
          cb(event.body.response);
        }
      },
      err => {
        console.log('Could not generate ID!');
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

  public GetVoucher(searchQuery: SearchQuery, cb: (vouchers) => void) {
    this.requestServices.post(AppConfig.BaseUrl + 'voucher/admin/getall', searchQuery).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event.body);
          this.currentVoucher = event.body;
          cb(event.body);
        }
      },
      err => {
        console.log('Could not get all Voucher!');
        console.log(err);

      });
  }

  public GetVoucherDetail(id: string, cb: (VoucherData) => void) {
    if (this.currentVoucher !== null) {
      let matchVoucher = this.currentVoucher.find(x => x.voucher_second_id === id);
      if (matchVoucher) {
        cb(matchVoucher);
        return;
      }
    }
    this.requestServices.get(`${this.HostURL}voucher/admin/detail/${id}`).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('voucher detail: ');
          cb(event.body);
        }
      },
      err => {
        console.log(err);
      });
  }

  public DeleteVoucher(voucher: VoucherData, cb: (success: boolean) => void) {
    this.requestServices.post(`${this.HostURL}voucher/admin/delete`, voucher).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('delete voucherID: ');
          console.log(event.body);
          cb(true);
        }
      },
      err => {
        console.log(err);
        cb(false);
      });
  }

  public createVoucher(voucher: VoucherData, cb: (success: boolean) => void) {
    this.requestServices.post(`${this.HostURL}voucher/admin/create`, voucher).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('create voucherID: ');
          console.log(event.body);
          cb(true);
        }
      },
      err => {
        console.log(err);
        cb(false);
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

  public SaveShipProvider(submitData: any, cb: () => void, error: () => void) {
    this.requestServices.post(AppConfig.BaseUrl + 'shippingprovider/admin/update', submitData)
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


  public sendNotification(notifi: AppNotification, cb: () => void, error: () => void) {
    this.requestServices.post(`${this.HostURL}fcmtoken/admin/sendnotifi`, notifi)
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
