import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { UploadImageComponent } from '../upload-image/upload-image.component';
import { RequestService } from '../services/request.service';

import { AppConfig } from '../config';

import { HttpResponse } from '@angular/common/http';


import { APIService } from '../services/api.service';
import { BeerDetail, BeerUnit } from '../object/BeerDetail';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.css']
})
export class BeerDetailComponent implements AfterViewInit, OnInit {

  alertMessage: string;
  alertType: string;

  isDisableSubmitButton: boolean;
  beerName: string;
  beerDetail: string;
  beerCategory: any;

  listUnits: BeerUnit[] = [];

  faPlus = faPlus;
  faTrash = faTrash;

  @ViewChild('imageManager')
  set imgUploadManager(imageManager: UploadImageComponent) {
    if (imageManager !== undefined) {
      imageManager.setPath(`beer/admin/${this.beerID}/img`);
      imageManager.loadAllImage();
    }
  }

  beerID: string;

  constructor(private route: ActivatedRoute,
    private requestServices: RequestService,
    private app: AppService,
    private api: APIService) { }




  ngAfterViewInit(): void {
  }

  ngOnInit() {
    const beerIdFromRoute = this.route.snapshot.paramMap.get('beerId');
    this.beerID = beerIdFromRoute;
    this.isDisableSubmitButton = true;
    if (this.showConfigView()) {
      //should load beer detail
      this.api.GetProductDetail(this.beerID, result => {
        if (result) {
          this.beerName = result.name;
          this.beerDetail = result.detail;
          this.beerCategory = result.category;
          this.listUnits = result.listUnit;
          this.isDisableSubmitButton = false;
        }
      });
    } else {
      this.requestServices.get(AppConfig.BaseUrl + 'beer/admin/generateid').subscribe(
        event => {
          if (event instanceof HttpResponse) {
            console.log(event.body);
            this.beerID = event.body.response;
            this.isDisableSubmitButton = false;
          }
        },
        err => {
          console.log('Could not generate beer ID!');
          console.log(err);

        });
    }
  }

  showConfigView(): boolean {
    return this.beerID !== 'newBeer';
  }

  getDefaultUnit(): BeerUnit {
    return {
      beer: '',
      name: '',
      price: 0,
      discount: 0,
      weight: 0,
      volumetric: 0,
      dateExpir: null,
      beer_unit_second_id: null
    };
  }

  addnewUnit() {
    this.listUnits.push(this.getDefaultUnit());
  }

  removeUnit(index: number) {
    console.log('remove: ' + index);

    this.listUnits.splice(index, 1);
  }

  submitBeer() {
    this.isDisableSubmitButton = true;
    this.listUnits.forEach((value, index) => {
      value.beer = this.beerID;
    });
    let submitData: BeerDetail = {
      name: this.beerName,
      beerSecondID: this.beerID,
      detail: this.beerDetail,
      category: this.beerCategory,
      listUnit: this.listUnits,
      images: []
    }
    //console.log(JSON.stringify(submitData));

    console.log(submitData);

    this.requestServices.post(AppConfig.BaseUrl + 'beer/admin/create', submitData).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event.body);
          for (let beerUnit of event.body) {
            let beerU: BeerUnit = this.listUnits.find(bu => bu.name === beerUnit.name);
            if (beerU != undefined) {
              beerU.beer_unit_second_id = beerUnit.beer_unit_second_id;
            }
          }
          this.isDisableSubmitButton = false;
          this.app.changeNotification('Lưu sản phẩm thành công!!!');
        }
      },
      err => {
        console.log('Could not save beer!');
        console.log(err);
        this.isDisableSubmitButton = false;
        this.app.changeNotification('Error: Không thể lưu sản phẩm!!!');
      });

  }
}
