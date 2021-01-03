import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { UploadImageComponent } from '../upload-image/upload-image.component';
import { BeerService } from '../services/beer.service'

import { HttpEventType, HttpResponse } from '@angular/common/http';

import { NgbDateStruct, NgbCalendar , NgbAlert} from '@ng-bootstrap/ng-bootstrap';

import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

interface BeerUnit {
  beer: string;
  name: string;
  price: number;
  discount: number;
  dateExpir: NgbDateStruct;
  shipPrice: string;
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
    private beerAPI: BeerService,
    private calendar: NgbCalendar) { }




  ngAfterViewInit(): void {
  }

  ngOnInit() {
    const beerIdFromRoute = this.route.snapshot.paramMap.get('beerId');
    this.beerID = beerIdFromRoute;
    if (this.showConfigView()) {
    } else {
      this.beerAPI.getBeerID().subscribe(
        event => {
          if (event instanceof HttpResponse) {
            console.log(event.body);
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
      shipPrice: '',
      dateExpir: null
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

    this.beerAPI.submitBeer(submitData).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log(event.body);
          this.showAlert('success','Lưu sản phẩm thành công!!!');
        }
      },
      err => {
        console.log('Could not save beer!');
        console.log(err);
        this.showAlert('danger','Không thể lưu sản phẩm!!!');
      });

  }
  public showAlert(type:string, msg:string) {
    this.alertType = type;
    this._success.next(msg);
  }

}
