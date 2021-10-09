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
          @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

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
              font-family: Roboto, sans-serif;
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
          <img src="https://trumbien.com/assets/img/Logo.png" alt="" class="logo center-horizontal">
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
      this.price = order.total_price;

      this.totalPrice = this.shipPrice + this.price;

      this.listProduct = cover(order);

      this.dataSource.data = this.listProduct;
    });
  }
  closeOrder() {
    this.api.CloseOrder(this.id, result => {
      this.api.RemoveOrder(this.id);
      this.app.changeNotification("Đóng đơn thành công!");
    });
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
