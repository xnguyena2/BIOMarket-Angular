import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';

import { UploadImageComponent } from '../upload-image/upload-image.component';

import { AppConfig } from '../config';

import { AppService } from '../services/app.service';
import { APIService } from '../services/api.service';

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

interface ShippingProviderData {
  id: string;
  json: string;
}

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements AfterViewInit, OnInit {

  alertMessage: string;
  alertType: string;


  readonly providerID = "GHN";

  deviceColor: string = "#0427a7";

  ghn: ShippingProvider;

  @ViewChild('imageManager') imageManager: UploadImageComponent

  carouselPath = 'carousel/admin'

  constructor(
    private api: APIService,
    private app: AppService) { }

  ngAfterViewInit(): void {
    this.imageManager.setPath(this.carouselPath);
    this.imageManager.loadAllImage();
    this.api.GetDeviceConfig(deviceConfig => {
      if (deviceConfig != undefined)
        this.deviceColor = deviceConfig.color;
    }, () => {
      this.app.changeNotification('Error: Không thể kết nối máy chủ!!!');
    });

    this.api.GetShippingProvider(this.providerID, response => {
      if (response != undefined && response.config != undefined) {
        this.ghn = JSON.parse(response.config);
      } else {
        this.ghn = AppConfig.GHN;
      }
    }, () => {
      this.app.changeNotification('Error: Không thể kết nối máy chủ!!!');
    });
  }

  ngOnInit() {
  }


  saveDeviceColor(): void {
    console.log(this.deviceColor);
    this.api.SaveDeviceColor({
      color: this.deviceColor
    }, () => {
      this.app.changeNotification('Lưu màu thành công!!!');
    }, () => {
      this.app.changeNotification('Error: Không thể lưu cài đặt!!!');
    });
  }

  saveShipProvider(): void {
    let submitData: ShippingProviderData = {
      id: this.providerID,
      json: JSON.stringify(this.ghn)
    }
    this.api.SaveShipProvider(submitData, () => {
      this.app.changeNotification('Lưu shipping-provider thành công!!!');
    }, () => {
      this.app.changeNotification('Error: Không thể lưu cài đặt!!!');
    });
  }

}
