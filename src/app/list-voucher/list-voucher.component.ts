import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '../object/BeerDetail';
import { SearchQuery } from '../object/SearchQuery';

import { APIService } from '../services/api.service';
import { AppService } from '../services/app.service';

export interface VoucherData{

  voucher_second_id:string;
  detail:string;
  discount:number;
  amount:number;
  reuse:number;
  status:string;
  for_all_beer: boolean;
  for_all_user: boolean;
  dateExpir:NgbDateStruct;
  listUser: string[];
  listBeer: string[];
}

@Component({
  selector: 'app-list-voucher',
  templateUrl: './list-voucher.component.html',
  styleUrls: ['./list-voucher.component.css']
})
export class ListVoucherComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'detail', 'discount', 'delete', 'add'];
  data:VoucherData[] = [];
  dataSource = new MatTableDataSource<VoucherData>(this.data);
  faTrash = faTrash;
  faPlus = faPlus;

  constructor(
    private api: APIService,
    private app: AppService) { }

  ngOnInit(): void {
    this.api.GetVoucher(new SearchQuery('all', 0, 1000, ''), vouchers => {
      this.data = vouchers;
      this.dataSource.data = vouchers;
    });
  }

  deleteVoucher(voucher: VoucherData): void {
    this.api.DeleteVoucher(voucher, result => {
      if (result) {
        let index: number = this.data.findIndex(d => d.voucher_second_id === voucher.voucher_second_id);
        this.data.splice(index, 1)
        this.dataSource.data = this.data;
        this.app.changeNotification('Xóa voucher thành công!!!');
      } else {
        this.app.changeNotification('Error: Không thể xóa voucher!!!');
      }
    });
  }
}
