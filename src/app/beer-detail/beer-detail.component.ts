import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { UploadImageComponent } from '../upload-image/upload-image.component';
import { RequestService } from '../services/request.service';

import { AppConfig } from '../config';

import { HttpResponse } from '@angular/common/http';

import { NgbDateStruct, NgbCalendar , NgbAlert} from '@ng-bootstrap/ng-bootstrap';

import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

interface BeerUnit {
  beer: string;
  name: string;
  price: number;
  discount: number;
  dateExpir: NgbDateStruct;
  weight: number;
  volumetric:number;
  beer_unit_second_id:string;
}

export interface BeerDetail {
  beerSecondID: string;
  name: string;
  detail: string;
  category: string;

  listUnit: BeerUnit[];
}


@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.css']
})
export class BeerDetailComponent implements AfterViewInit, OnInit {

  private _success = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  alertMessage:string;
  alertType:string;

  isDisableSubmitButton:boolean;
  beerName: string;
  beerDetail: string;
  beerCategory: any;

  listUnits: BeerUnit[] = [];

  faPlus = faPlus;
  faTrash = faTrash;

  @ViewChild('imageManager')
  set imgUploadManager(imageManager: UploadImageComponent) {
    if (imageManager !== undefined) {
      imageManager.setPath(`beer/${this.beerID}/img`);
      imageManager.loadAllImage();
    }
  }

  beerID: string;

  constructor(private route: ActivatedRoute,
    private requestServices: RequestService,
    private calendar: NgbCalendar) { }




  ngAfterViewInit(): void {
  }

  ngOnInit() {
    const beerIdFromRoute = this.route.snapshot.paramMap.get('beerId');
    this.beerID = beerIdFromRoute;
    if (this.showConfigView()) {
      //should load beer detail
      this.isDisableSubmitButton=false;
    } else {
      this.isDisableSubmitButton = true;
      this.requestServices.get(AppConfig.BaseUrl+'beer/generateid').subscribe(
        event => {
          if (event instanceof HttpResponse) {
            console.log(event.body);
            this.isDisableSubmitButton = false;
            this.beerID = event.body.response;
            this.addnewUnit();
          }
        },
        err => {
          console.log('Could not generate beer ID!');
          console.log(err);

        });
    }
    this._success.subscribe(message => this.alertMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
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
      beer_unit_second_id:null
    };
  }

  showConfigView(): boolean {
    return this.beerID !== 'newBeer';
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
    this.listUnits.forEach((value,index)=>{
      value.beer = this.beerID;
    });
    let submitData: BeerDetail = {
      name: this.beerName,
      beerSecondID: this.beerID,
      detail: this.beerDetail,
      category: this.beerCategory,
      listUnit: this.listUnits
    }
    //console.log(JSON.stringify(submitData));

    this.requestServices.post(AppConfig.BaseUrl+'beer/create', submitData).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event.body);
          for(let beerUnit of event.body){
            let beerU: BeerUnit = this.listUnits.find(bu => bu.name === beerUnit.name);
            if(beerU!=undefined){
              beerU.beer_unit_second_id = beerUnit.beer_unit_second_id;
            }
          }
          this.isDisableSubmitButton = false;
          this.showAlert('success','Lưu sản phẩm thành công!!!');
        }
      },
      err => {
        console.log('Could not save beer!');
        console.log(err);
        this.isDisableSubmitButton = false;
        this.showAlert('danger','Không thể lưu sản phẩm!!!');
      });

  }
  public showAlert(type:string, msg:string) {
    this.alertType = type;
    this._success.next(msg);
  }

}
