import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PackageOrder } from '../object/OrderSearchResult';
import { SearchQuery } from '../object/SearchQuery';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'user', 'address', 'region', 'district', 'ward', 'phone', 'totalprice', 'shipprice', 'delete'];
  readonly maxSearResult: number = 50;

  listProduct: PackageOrder[] = [];
  dataSource = new MatTableDataSource<PackageOrder>(this.listProduct);
  faTrash = faTrash
  faPlus = faPlus

  constructor(private api: APIService) { }

  ngOnInit(): void {
    this.api.SearcOrder(new SearchQuery('ORDER', 0, this.maxSearResult, ''), result => {
      if (result === null) {

      } else {
        this.listProduct = result.result;
        this.dataSource.data = this.listProduct;
      }
    });
  }

  deleteProduct(order: PackageOrder){

  }

}
