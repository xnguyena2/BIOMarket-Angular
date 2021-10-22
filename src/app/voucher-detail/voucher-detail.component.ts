import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';


import { VoucherData } from '../list-voucher/list-voucher.component';
import { APIService } from '../services/api.service';
import { AppService } from '../services/app.service';


@Component({
  selector: 'app-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.css']
})
export class VoucherDetailComponent implements OnInit {

  alertMessage: string;
  alertType: string;
  //

  faPlus = faPlus;
  faTrash = faTrash;

  voucherDetail: VoucherData;

  voucherID: string;

  isDisableSubmitButton: boolean;
  isDisableID: boolean;

  constructor(
    private route: ActivatedRoute,
    private app: AppService,
    private api: APIService) { }

    showConfigView(): boolean {
      return this.voucherID !== 'newVoucher';
    }

  ngOnInit(): void {
    this.voucherDetail = this.getDefaultDetail();
    this.voucherID = this.route.snapshot.paramMap.get('voucherId');
    this.isDisableSubmitButton = true;
    if (this.showConfigView()) {
      console.log(this.voucherID);
      this.isDisableID = true;
      this.api.GetVoucherDetail(this.voucherID, voucherDetail => {
        this.voucherDetail = voucherDetail;
        this.isDisableSubmitButton = false;
      });
    } else {
      this.isDisableSubmitButton = false;
      this.isDisableID = false;
    }
  }

  getDefaultDetail(){
    return {
      voucher_second_id:this.voucherID,
      detail:'',
      discount:0,
      amount:0,
      reuse:-1,
      status:null,
      for_all_beer: false,
      for_all_user: false,
      dateExpir:null,
      listUser: [],
      listBeer: []

    };
  }

  removeUser(index: number): void {
    console.log('remove: ' + index);

    this.voucherDetail.listUser.splice(index, 1);
  }

  addnewUser(user: string): void {
    this.voucherDetail.listUser.push(user);
  }

  removeBeer(index: number): void {
    console.log('remove: ' + index);

    this.voucherDetail.listBeer.splice(index, 1);
  }

  addnewBeer(product: string): void {
    this.voucherDetail.listBeer.push(product);
  }

  submitVoucher(): void {
    this.isDisableSubmitButton = true;
    this.api.createVoucher(this.voucherDetail, result=>{
      if (result) {
        this.app.changeNotification('update voucher thành công!!!');
        this.isDisableSubmitButton = false;
      } else {
        this.app.changeNotification('Error: update voucher failt!!!');
        this.isDisableSubmitButton = false;
      }
    });
  }
}
