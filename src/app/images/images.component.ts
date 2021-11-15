import { Component, OnInit, ViewChild } from '@angular/core';
import { AppConfig } from '../config';
import { UploadImageComponent } from '../upload-image/upload-image.component';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  @ViewChild('imageManager')
  set imgUploadManager(imageManager: UploadImageComponent) {
    if (imageManager !== undefined) {
      imageManager.setPath(AppConfig.ImagePath);
      imageManager.loadAllImage();
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
