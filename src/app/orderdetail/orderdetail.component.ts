import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { invokeConfig } from '../config';
import { cover, OrderItem } from '../object/OrderSearchResult';
import { APIService } from '../services/api.service';
import { AppService } from '../services/app.service';
import { AppNotification } from '../object/Notification';

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

  status: string = '';

  notificationMsg: string = 'Cảm ơn bạn đã đặt hàng, đơn hàng của bạn đã được xác nhận, chúng tôi sẽ ship trong thời gian sớm nhất!!';

  price: number = 0;
  shipPrice: number = 0;

  totalPrice: number = 0;

  readonly iframeSourceDoc: string = invokeConfig;

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
      this.price = order.real_price;

      this.totalPrice = this.shipPrice + this.price;

      this.listProduct = cover(order);

      this.status = order.status;

      this.dataSource.data = this.listProduct;
    });
  }

  closeOrder(status: string) {
    this.api.CloseOrder(this.id, status, result => {
      this.api.RemoveOrder(this.id);
      this.app.changeNotification("Đóng đơn thành công!");
    });
  }

  doneOrder() {
    this.closeOrder("DONE");
  }

  cancelOrder() {
    this.closeOrder("CANCEL");
  }

  private getPrinterSource(invoke: any) {

    let src = this.iframeSourceDoc.replace("INVOKE_DATA", JSON.stringify(invoke));
    return 'data:text/html,' + encodeURIComponent(src);
  }

  public Print(printer: HTMLIFrameElement) {
    let invoke = {
      reciver_fullname: this.fullName,
      phone_number: this.phone,
      reciver_address: this.address,
      ward: this.ward,
      district: this.district,
      region: this.region,
      total_price: this.price,
      listProduct: this.listProduct
    };

    printer.src = this.getPrinterSource(invoke);
  }

  public sendNotification() {
    this.api.sendNotification(new AppNotification('1687247699000', "Xác nhận đơn hàng!", this.notificationMsg), () => { }, () => { });
  }
}
