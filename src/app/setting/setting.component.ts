import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import { from } from 'rxjs';
import { UploadImageComponent } from '../upload-image/upload-image.component';

import {DeviceconfigService} from '../services/deviceconfig.service'

export interface DeviceConfigData{
  color:string
}

interface PackagePrice {
  reciverLocation: string;

  maxWeight: number;
  priceMaxWeight: number;

  nextWeight: number;
  priceNextWeight: number;
}

interface ShippingProvider {
  weigitExchange: number;

  listPackagePriceDetail: PackagePrice[];
}

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements AfterViewInit {

  ghn: ShippingProvider = {
    weigitExchange: 0.0002,
    listPackagePriceDetail: [{
      reciverLocation: "INSIDE_REGION",
      maxWeight: 3,
      priceMaxWeight: 20000,
      nextWeight: 0.5,
      priceNextWeight: 5000
    },
    {
      reciverLocation: "OUTSIDE_REGION_TYPE1",
      maxWeight: 3,
      priceMaxWeight: 20000,
      nextWeight: 0.5,
      priceNextWeight: 5000
    },
    {
      reciverLocation: "OUTSIDE_REGION_TYPE2",
      maxWeight: 3,
      priceMaxWeight: 20000,
      nextWeight: 0.5,
      priceNextWeight: 5000
    },
    {
      reciverLocation: "INSIDE_GREGION",
      maxWeight: 3,
      priceMaxWeight: 20000,
      nextWeight: 0.5,
      priceNextWeight: 5000
    },
    {
      reciverLocation: "DIFFIRENT_GPREGION",
      maxWeight: 3,
      priceMaxWeight: 20000,
      nextWeight: 0.5,
      priceNextWeight: 5000
    }
    ]
  }

  colorrrr: string;

  @ViewChild('imageManager') imageManager: UploadImageComponent

  carouselPath = 'carousel'

  constructor(private deviceConfig: DeviceconfigService) { }

  ngAfterViewInit(): void {
    this.imageManager.setPath(this.carouselPath);
    this.imageManager.loadAllImage();
  }

  saveDeviceColor(color:string):void{
    console.log(color);
    this.deviceConfig.changeDeviceConfig({
      color:color
    }).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event.body);
        }
      },
      err => {
        console.log('Could not generate beer ID!');
        console.log(err);

      });
  }

}
