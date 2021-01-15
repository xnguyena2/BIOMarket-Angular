import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { RequestService } from '../services/request.service';

import { AppConfig } from '../config';

import { HttpResponse } from '@angular/common/http';

export interface BeerBasicInfo {
  id:string;
  name: string;
  sold: number;
  order: number;
}
const ELEMENT_DATA: BeerBasicInfo[] = [
  { id: "123", name: 'Bia Nhập Lậu', sold: 1000, order: 10 },
];

@Component({
  selector: 'app-list-beer',
  templateUrl: './list-beer.component.html',
  styleUrls: ['./list-beer.component.css']
})
export class ListBeerComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'name', 'sold', 'order', 'delete', 'add'];
  data = Object.assign(ELEMENT_DATA);
  dataSource = new MatTableDataSource<Element>(this.data);
  faTrash = faTrash
  faPlus = faPlus

  constructor(private requestServices:RequestService) { }

  ngOnInit(): void {
    this.requestServices.post(AppConfig.BaseUrl + 'beer/getall', {
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
      let voucher: BeerBasicInfo = {
        id: v.id,
        name: v.name,
        sold: v.sold,
        order: v.order
      };
      this.data.push(voucher);
    }
    this.dataSource.data = this.data
  }

  deleteProduct(product: BeerBasicInfo): void {
    let index: number = this.data.findIndex(d => d === product);
    this.data.splice(index, 1)
    this.dataSource.data = this.data
  }
}
