import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { OrderSearchResult } from '../object/OrderSearchResult';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly IGNORE: OrderSearchResult = null;
  readonly IGNORESTR: string = '';

  private orderSource = new BehaviorSubject<OrderSearchResult>(this.IGNORE);
  private order = this.orderSource.asObservable();

  private notificationSource = new BehaviorSubject<string>(this.IGNORESTR);
  private notification = this.notificationSource.asObservable();

  private newOrderTotificationSource = new BehaviorSubject<string>(this.IGNORESTR);
  private newOrderTotification = this.newOrderTotificationSource.asObservable();

  constructor() { }

  //alter
  public registerOrder(func: (filter: OrderSearchResult) => void) {
    this.order.pipe(filter(x => x !== this.IGNORE)).subscribe(f => func(f));
  }
  public changeOrder(filter: OrderSearchResult) {
    this.orderSource.next(filter);
  }

  //alter
  public registerNotification(func: (filter: string) => void, close: ()=>void) {
    this.notification.pipe(filter(x => x !== this.IGNORESTR)).pipe(map(x=>{
      func(x);
      return x;
    })).pipe(debounceTime(5000)).subscribe(f => close());
  }
  public changeNotification(filter: string) {
    this.notificationSource.next(filter);
  }


  //new order notification
  public registerNewOrderNotification(func: (filter: string) => void) {
    this.newOrderTotification.pipe(filter(x => x !== this.IGNORESTR)).subscribe(f => func(f));
  }
  public haveNewOrderer(filter: string) {
    this.newOrderTotificationSource.next(filter);
  }
}
