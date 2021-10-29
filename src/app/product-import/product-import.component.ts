import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductImport } from '../object/ProductImport';
import { ProductOrder } from '../object/ProductOrder';
import { SearchQuery } from '../object/SearchQuery';
import { APIService } from '../services/api.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-product-import',
  templateUrl: './product-import.component.html',
  styleUrls: ['./product-import.component.css']
})
export class ProductImportComponent implements OnInit {
  readonly displayedColumns: string[] = ['ID', 'Price', 'Amount', 'Detail', 'Createat', 'delete', 'add'];
  readonly displayedinvokeColumns: string[] = ['ID', 'Name', 'Price', 'Createat'];

  listRecord: ProductImport[] = [];
  dataSource = new MatTableDataSource<ProductImport>(this.listRecord);

  listProductOrder: ProductOrder[] = [];
  productOrderDataSource = new MatTableDataSource<ProductOrder>(this.listProductOrder);

  date: number = 30;

  faPlus = faPlus;
  faTrash = faTrash;

  disableCreateBtn: boolean;


  addNewRecordPopup: boolean = false;
  currentRecordID: string;
  currentRecordPrice: number;
  currentRecordAmount: number;
  currentRecordDetail: string;

  total_price_import: number = 0;
  total_number_import: number = 0;

  total_price: number = 0;
  real_price: number = 0;

  total_price_sell: number = 0;


  @Input() subPath: string = 'getall';
  @Input() productID: string;

  isStatictis: boolean;

  constructor(private api: APIService,
    private app: AppService) { }

  ngOnInit(): void {
    console.log(this.productID);
    this.getAllRecord();
    this.getAllProductOrder();
    this.isStatictis = this.subPath === 'getall';
  }

  getAllRecord() {
    this.api.AdminGetAllProductImport(this.subPath, new SearchQuery(this.productID, 0, 1000, this.date.toString()), (result) => {
      this.listRecord = result;
      this.dataSource.data = result;
      let sumbO = result.reduce((a, b) => {
        a.price += b.price;
        a.number += b.amount;
        return a;
      }, { price: 0, number: 0 });
      this.total_price_import = sumbO.price;
      this.total_number_import = sumbO.number;
    });
  }

  getAllProductOrder() {
    this.api.AdminGetAllProductOrder(this.subPath, new SearchQuery(this.productID, 0, 1000, this.date.toString()), (result) => {
      this.listProductOrder = result;
      this.productOrderDataSource.data = result;
      this.total_price_sell = result.reduce((a, b) => a + b.total_price, 0);
    });
    if (this.isStatictis) {
      this.api.AdminGetTotalOrder(new SearchQuery('DONE', 0, 0, this.date.toString()), (result) => {
        this.real_price = result.real_price;
        this.total_price = result.total_price;
      });
    }
  }

  deleteRecord(elment: ProductImport) {
    this.api.DeleteProductImport(elment.product_import_second_id, result => {
      let index: number = this.listRecord.findIndex(d => d === elment);
      this.listRecord.splice(index, 1);
      this.dataSource.data = this.listRecord;
    });
  }

  showAddNewRecord(showPopup: boolean) {
    this.addNewRecordPopup = showPopup;

    this.disableCreateBtn = true;
    this.currentRecordID = null;
    this.currentRecordPrice = 0;
    this.currentRecordAmount = 0;
    this.currentRecordDetail = null;

    if (showPopup) {
      this.api.GenerateID(newID => {
        this.disableCreateBtn = false;
        this.currentRecordID = newID;
      });
    }
  }

  createNewRecord() {
    this.api.AdminCreateProductImport({
      product_import_second_id: this.currentRecordID,
      product_id: this.productID,
      product_name: '',
      price: this.currentRecordPrice,
      amount: this.currentRecordAmount,
      detail: this.currentRecordDetail,
      createat: null
    }, result => {
      if (result) {
        this.app.changeNotification('update account thành công!!!');
        this.showAddNewRecord(false);
        this.getAllRecord();
      } else {
        this.app.changeNotification('Error: update account failt!!!');
      }
    });
  }

  applyChange() {
    this.getAllRecord();
    this.getAllProductOrder();
  }

}
