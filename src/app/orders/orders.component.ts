import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
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
  displayedColumns: string[] = ['user', 'address', 'region', 'district', 'ward', 'phone', 'totalprice', 'shipprice', 'time'];
  readonly maxSearResult: number = 50;

  listProduct: PackageOrder[] = [];
  dataSource = new MatTableDataSource<PackageOrder>(this.listProduct);
  faTrash = faTrash
  faPlus = faPlus

  constructor(private api: APIService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      params => {
        const status = params.status;

        if (status === 'new' && this.api.GetNewListOrder() !== null) {
          this.listProduct = this.api.GetNewListOrder().result;
          this.dataSource.data = this.listProduct;
        } else {

          this.api.SearcOrder(new SearchQuery('ORDER', 0, this.maxSearResult, ''), result => {
            if (result === null) {

            } else {
              console.log(result);

              this.listProduct = result.result;
              this.dataSource.data = this.listProduct;
            }
          });
        }
      });
  }

  deletePackage(order: PackageOrder) {
    console.log(order);

    this.api.CloseOrder(order.package_order_second_id, result => {
      this.api.RemoveOrder(order.package_order_second_id);
    });
  }

  refresh() {
    this.api.UpdateOrderList(new SearchQuery('ORDER', 0, this.maxSearResult, ''));
  }

}
