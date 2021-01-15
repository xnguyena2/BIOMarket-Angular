import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../services/request.service';

import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';


import { NgbDateStruct , NgbAlert} from '@ng-bootstrap/ng-bootstrap';

import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.css']
})
export class VoucherDetailComponent implements OnInit {

  private _success = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  alertMessage:string;
  alertType:string;
  //

  faPlus = faPlus;
  faTrash = faTrash;

  voucherName:string;
  voucherID:string;
  voucherDetail:string;
  voucherAmount:number;
  voucherDiscount:number;
  dateExpir:NgbDateStruct;

  newUserID:string;

  listUser:string[] = [];

  listBeer:string[] = [];

  constructor(private route: ActivatedRoute,
    private requestServices: RequestService
    ) { }

  ngOnInit(): void {
    this._success.subscribe(message => this.alertMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  showConfigView(): boolean {
    return this.voucherID !== 'newVoucher';
  }

  removeUser(index:number):void{
    console.log('remove: ' + index);

    this.listUser.splice(index, 1);
  }

  addnewUser(user:string):void{
    this.listUser.push(user);
  }

  removeBeer(index:number):void{
    console.log('remove: ' + index);

    this.listBeer.splice(index, 1);
  }

  addnewBeer(user:string):void{
    this.listBeer.push(user);
  }

  submitVoucher():void{

  }
  showAlert(type:string, msg:string) {
    this.alertType = type;
    this._success.next(msg);
  }
}
