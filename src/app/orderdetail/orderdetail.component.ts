import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { cover, OrderItem } from '../object/OrderSearchResult';
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

  readonly iframeSourceDoc: string = `
  <!DOCTYPE html>
  <html lang="en">

  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>

          * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
          }

          @page {
              width: 58mm;
              margin: 0;
          }

          @media print {
              @page {
                  width: 58mm;
                  margin: 0;
              }
          }

          html {
              width: 58mm;
              height: max-content;

              /* border: 1px solid gray; */
              font-family: Asap, sans-serif;
          }

          body {
              width: 58mm;
              height: max-content;
              padding: 10px;
          }

          .center-horizontal {
              margin: 0 auto;
              width: max-content;
          }

          .main-container>* {
              display: block;
          }

          .main-container>*+* {
              margin-top: 10px;
          }

          .logo {
              height: 63px;
              object-fit: contain;
              display: block;
          }

          .user-name {
              font-size: 14px;
          }

          table {
              border-collapse: collapse;
              width: max-content;
              margin: 0 auto;
              max-width: 100%;
          }

          tbody {
              max-width: 100%;
          }

          td,
          th {
              border: 1px solid #ddd;
              padding: 5px;
              font-size: 9px;
          }

          td {
              text-align: left;
              word-break: break-all;
          }

          .match-width {
              width: 100%;
          }

          .totalPrice {
              width: max-content;
              display: inline-block;
          }

          .spell {
              text-align: center;
              width: 100%;
              text-transform: capitalize;
          }

          #dpi {
              height: 1in;
              left: -100%;
              position: absolute;
              top: -100%;
              width: 1in;
          }
      </style>
      <title>Trùm Biển</title>
  </head>

  <script>
      var invokeTxt = 'INVOKE_DATA';


      var invoke = JSON.parse(invokeTxt);

      var formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

      function getCurrentDate() {
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          return dd + '/' + mm + '/' + yyyy;
      }

      function insetInvoke(invoke) {
          // Find a <table> element with id="myTable":
          var table = document.getElementById("invokes");

          var row = table.insertRow();

          // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
          var name = row.insertCell(0);
          var no = row.insertCell(1);
          var money = row.insertCell(2);

          // Add some text to the new cells:
          name.innerHTML = invoke.name + " (" + invoke.unit + ")";
          no.innerHTML = invoke.number;
          money.innerHTML = formatter.format(invoke.price);
      }

      var DOCSO = function () { var t = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"], r = function (r, n) { var o = "", a = Math.floor(r / 10), e = r % 10; return a > 1 ? (o = " " + t[a] + " mươi", 1 == e && (o += " mốt")) : 1 == a ? (o = " mười", 1 == e && (o += " một")) : n && e > 0 && (o = " lẻ"), 5 == e && a >= 1 ? o += " lăm" : 4 == e && a >= 1 ? o += " tư" : (e > 1 || 1 == e && 0 == a) && (o += " " + t[e]), o }, n = function (n, o) { var a = "", e = Math.floor(n / 100), n = n % 100; return o || e > 0 ? (a = " " + t[e] + " trăm", a += r(n, !0)) : a = r(n, !1), a }, o = function (t, r) { var o = "", a = Math.floor(t / 1e6), t = t % 1e6; a > 0 && (o = n(a, r) + " triệu", r = !0); var e = Math.floor(t / 1e3), t = t % 1e3; return e > 0 && (o += n(e, r) + " ngàn", r = !0), t > 0 && (o += n(t, r)), o }; return { doc: function (r) { if (0 == r) return t[0]; var n = "", a = ""; do ty = r % 1e9, r = Math.floor(r / 1e9), n = r > 0 ? o(ty, !0) + a + n : o(ty, !1) + a + n, a = " tỷ"; while (r > 0); return n.trim() } } }();


      var cssPagedMedia = (function () {
          var style = document.createElement('style');
          document.head.appendChild(style);
          return function (rule) {
              style.innerHTML = rule;
          };
      }());

      document.addEventListener('DOMContentLoaded', function () {

          var currentDate = getCurrentDate();

          document.getElementById("date-invoke").textContent = currentDate;

          document.getElementById("name").textContent = invoke.reciver_fullname;
          document.getElementById("phone").textContent = invoke.phone_number;
          document.getElementById("address").textContent = invoke.reciver_address + " " + invoke.ward + " " + invoke.district + " " + invoke.region;


          for (var i = 0; i < invoke.listProduct.length; i++) {
              insetInvoke(invoke.listProduct[i]);
          }

          document.getElementById("total").textContent = formatter.format(invoke.total_price);
          document.getElementById("spell").textContent = DOCSO.doc(invoke.total_price);

          setTimeout(() => {
              var body = document.body;

              var invokeHeight = Math.max(body.scrollHeight, body.offsetHeight) + 3;
              const dpi = document.getElementById("dpi").offsetHeight;
              const heightMM = Math.floor((invokeHeight * 25.4) / dpi) + 'mm';
              cssPagedMedia('@page {size: 58mm ' + heightMM + '; height: ' + heightMM + ';}');
              cssPagedMedia('@media print {@page {size: 58mm ' + heightMM + '; height: ' + heightMM + ';}}');
              window.print();
          }, 1000);

      }, false);
  </script>

  <body>
      <div class="main-container">
          <img src="data:image/png;base64,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" alt="" class="logo center-horizontal">
          <h4 class="center-horizontal">TRÙM BIỂN</h4>
          <h5 class="center-horizontal">0822.088.079</h5>
          <span class="center-horizontal">Web: https://trumbien.com</span>
          <h4 class="center-horizontal">HÓA ĐƠN BÁN HÀNG</h4>
          <span id="date-invoke" class="center-horizontal"></span>
          <p class="user-name">KH: <span id="name"></span></p>
          <p class="user-name">SĐT: <span id="phone"></span></p>
          <p class="user-name">Đ/c: <span id="address"></span></p>
          <table id="invokes">
              <tr>
                  <th>Mặt Hàng</th>
                  <th>S.L</th>
                  <th>T.Tiền</th>
              </tr>
          </table>
          <h4 class="center-horizontal match-width">Tổng: <span class="totalPrice" id="total"></span></h4>
          <h5 class="center-horizontal spell" id="spell"></h5>
          <h5 class="center-horizontal spell">Xin Cảm Ơn Quý Khách!</h5>
      </div>
      <div id="dpi"></div>
  </body>

  </html>
  `;

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

      this.dataSource.data = this.listProduct;
    });
  }

  closeOrder(status: string) {
    this.api.CloseOrder(this.id, status, result => {
      this.api.RemoveOrder(this.id);
      this.app.changeNotification("Đóng đơn thành công!");
    });
  }

  doneOrder(){
    this.closeOrder("DONE");
  }

  cancelOrder(){
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
}
