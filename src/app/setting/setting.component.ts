import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { UploadImageComponent } from '../upload-image/upload-image.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements AfterViewInit {

  colorrrr:string;

  @ViewChild('imageManager') imageManager:UploadImageComponent

  carouselPath = 'carousel'

  constructor() { }

  ngAfterViewInit(): void {
    this.imageManager.setPath(this.carouselPath);
    this.imageManager.loadAllImage();
  }

}
