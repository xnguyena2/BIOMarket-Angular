import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { cover, OrderItem, PackageOrder } from '../object/OrderSearchResult';
import { APIService } from '../services/api.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'name', 'unit', 'number', 'price', 'discount'];
  readonly maxSearResult: number = 50;

  id: string;

  listProduct: OrderItem[] = [];
  dataSource = new MatTableDataSource<OrderItem>(this.listProduct);
  faTrash = faTrash
  faPlus = faPlus

  userID: string = '';
  fullName: string = '';
  phone: string = '';
  region: string = '';
  district: string = '';
  ward: string = '';
  address: string = '';

  price: number = 0;
  shipPrice: number = 0;

  totalPrice: number = 0;

  constructor(private route: ActivatedRoute,
    private api: APIService,
    private app: AppService) { }

  ngOnInit(): void {
    const orderID = this.route.snapshot.paramMap.get('orderid');
    this.api.GetOrderDetail(orderID, order => {
      console.log(order);

      this.id = order.package_order_second_id;

      this.userID = order.user_device_id;
      this.fullName = order.reciver_fullname;
      this.region = order.region;
      this.district = order.district;
      this.ward = order.ward;
      this.address = order.reciver_address;
      this.phone = order.phone_number;

      this.shipPrice = order.ship_price;
      this.price = order.total_price;

      this.totalPrice = this.shipPrice+this.price;

      this.listProduct = cover(order);

      this.dataSource.data = this.listProduct;
    });
  }
  closeOrder(){
    this.api.CloseOrder(this.id, result=>{
      this.api.RemoveOrder(this.id);
      this.app.changeNotification("Đóng đơn thành công!");
    });
  }
}
