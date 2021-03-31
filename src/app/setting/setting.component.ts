import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import {Subject} from 'rxjs';
import { from } from 'rxjs';
import { UploadImageComponent } from '../upload-image/upload-image.component';

import { RequestService } from '../services/request.service';

import { AppConfig } from '../config';
import { NgbAlert} from '@ng-bootstrap/ng-bootstrap';

import {debounceTime} from 'rxjs/operators';

export interface DeviceConfigData {
  color: string
}

interface PackagePrice {
  reciverLocation: string;

  maxWeight: number;
  priceMaxWeight: number;

  nextWeight: number;
  priceNextWeight: number;
}

export interface ShippingProvider {
  weigitExchange: number;

  listPackagePriceDetail: PackagePrice[];
}

interface ShippingProviderData{
  id:string;
  json:string;
}

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements AfterViewInit, OnInit {

  private _success = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  alertMessage:string;
  alertType:string;


  readonly providerID = "GHN";

  deviceColor: string = "#0427a7";

  ghn: ShippingProvider;

  @ViewChild('imageManager') imageManager: UploadImageComponent

  carouselPath = 'carousel/admin'

  constructor(
    private requestServices: RequestService) { }

  ngAfterViewInit(): void {
    this.imageManager.setPath(this.carouselPath);
    this.imageManager.loadAllImage();
    this.requestServices.get(AppConfig.BaseUrl+'deviceconfig/get').subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event.body);
          if (event.body != undefined) {
            this.deviceColor = event.body.color;
          }
        }
      },
      err => {
        console.log('Could not get device config!');
        console.log(err);
        this.showAlert('danger','Không thể kết nối máy chủ!!!');
      });
    this.requestServices.get(AppConfig.BaseUrl+'shippingprovider/admin/get/'+this.providerID).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event.body);
          if(event.body != undefined && event.body.config != undefined){
            this.ghn = JSON.parse(event.body.config);
          }else{
            this.ghn = AppConfig.GHN;
          }
        }
      },
      err => {
        console.log('Could not get ship provider!');
        console.log(err);
        this.showAlert('danger','Không thể kết nối máy chủ!!!');
      });
  }

  ngOnInit() {
    this._success.subscribe(message => this.alertMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }


  saveDeviceColor(): void {
    console.log(this.deviceColor);
    this.requestServices.post(AppConfig.BaseUrl+'deviceconfig/admin/changecolor',
    {
      color: this.deviceColor
    }).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event.body);
          this.showAlert('success','Lưu màu thành công!!!');
        }
      },
      err => {
        console.log('Could not save color!');
        console.log(err);
        this.showAlert('danger','Không thể lưu cài đặt!!!');
      });
  }

  saveShipProvider():void{
    let submitData:ShippingProviderData = {
      id : this.providerID,
      json: JSON.stringify(this.ghn)
    }
    this.requestServices.post(AppConfig.BaseUrl+'shippingprovider/admin/update', submitData)
    .subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event.body);
          this.showAlert('success','Lưu shipping-provider thành công!!!');
        }
      },
      err => {
        console.log('Could not save shipping provider!');
        console.log(err);
        this.showAlert('danger','Không thể lưu cài đặt!!!');
      });
  }

  public showAlert(type:string, msg:string) {
    this.alertType = type;
    this._success.next(msg);
  }

}
