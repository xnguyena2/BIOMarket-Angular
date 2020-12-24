import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UploadImageComponent } from '../upload-image/upload-image.component';
import { BeerService } from '../services/beer.service'

import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.css']
})
export class BeerDetailComponent implements AfterViewInit, OnInit {

  @ViewChild('imageManager')
  set imgUploadManager(imageManager:UploadImageComponent){
    if(imageManager!==undefined){
      imageManager.setPath(`beer/${this.beerID}/img`);
      imageManager.loadAllImage();
    }
  }

  beerID: string;

  constructor(private route: ActivatedRoute,
    private beerAPI: BeerService,) { }

  ngAfterViewInit(): void {
    if (this.showConfigView()) {
    } else {
      this.beerAPI.getBeerID().subscribe(
        event => {
          if (event instanceof HttpResponse) {
            console.log(event.body);
            this.beerID = event.body.response;
          }
        },
        err => {
          console.log('Could not delete the file!');
          console.log(err);

        });
    }
  }

  ngOnInit() {
    const beerIdFromRoute = this.route.snapshot.paramMap.get('beerId');
    this.beerID = beerIdFromRoute;
  }

  showConfigView(): boolean {
    return this.beerID !== 'newBeer';
  }

}
