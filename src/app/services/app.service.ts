import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { OrderSearchResult } from '../object/OrderSearchResult';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly IGNORE: OrderSearchResult = null;

  private orderSource = new BehaviorSubject<OrderSearchResult>(this.IGNORE);
  private order = this.orderSource.asObservable();

  constructor() { }

  //alter
  public registerOrder(func: (filter: OrderSearchResult) => void) {
    this.order.pipe(filter(x => x !== this.IGNORE)).subscribe(f => func(f));
  }
  public changeOrder(filter: OrderSearchResult) {
    this.orderSource.next(filter);
  }
}
