import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { RequestService } from '../services/request.service';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { AppConfig } from '../config';
import { HttpResponse } from '@angular/common/http';

export interface VoucherBasicInfo {
  id: string;
  code: string;
  detail: string;
  discount: string;
}
const ELEMENT_DATA: VoucherBasicInfo[] = [
  { id: "123", code: 'BIO_MARKET_5k', detail: "Giảm 5k trên mọi đơn hàng Giảm 5k trên mọi đơn hàng Giảm 5k trên mọi đơn hàng Giảm 5k trên mọi đơn hàng Giảm 5k trên mọi đơn hàng Giảm 5k trên mọi đơn hàngGiảm 5k trên mọi đơn hàngGiảm 5k trên mọi đơn hàng Giảm 5k trên mọi đơn hàng Giảm 5k trên mọi đơn hàng", discount: "10" },
];

@Component({
  selector: 'app-list-voucher',
  templateUrl: './list-voucher.component.html',
  styleUrls: ['./list-voucher.component.css']
})
export class ListVoucherComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'code', 'detail', 'discount', 'delete', 'add'];
  data = Object.assign([]);
  dataSource = new MatTableDataSource<Element>(this.data);
  faTrash = faTrash
  faPlus = faPlus

  constructor(
    private requestServices: RequestService) { }

  ngOnInit(): void {
    this.requestServices.post(AppConfig.BaseUrl + 'voucher/getall', {
      page: 0,
      size: 100
    }).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event.body);
          this.loadData(event.body);
        }
      },
      err => {
        console.log('Could not get all Voucher!');
        console.log(err);

      });
  }

  loadData(response: any) {
    for (let v of response) {
      let voucher: VoucherBasicInfo = {
        id: v.id,
        code: v.voucher_second_id,
        detail: v.detail,
        discount: v.amount != 0 ? v.amount + '' : v.discount + '%'
      };
      this.data.push(voucher);
    }
    this.dataSource.data = this.data
  }

  deleteVoucher(product: VoucherBasicInfo): void {
    let index: number = this.data.findIndex(d => d === product);
    this.data.splice(index, 1)
    this.dataSource.data = this.data
  }
}
