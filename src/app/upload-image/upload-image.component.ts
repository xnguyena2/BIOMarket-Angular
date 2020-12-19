import { Component, OnInit, Input} from '@angular/core';

import { UploadFileService } from 'src/app/services/upload-file.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AppConfig } from '../config'

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  @Input() title: string;
  @Input() path: string;

  files: any[] = [];
  faTrash = faTrash

  constructor(private uploadService: UploadFileService) { }

  ngOnInit(): void {
    this.getAllImage('carousel/all');
  }

  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  deleteFile(index: number) {

    let file = this.files[index];
    this.uploadService.deleteFile('carousel/delete', file.ImageID).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
        } else if (event instanceof HttpResponse) {
          console.log(event.body);
          this.files.splice(index, 1);
        }
      },
      err => {
        console.log('Could not delete the file!');
        console.log(err);

      });
  }


  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;

      const mimeType = item.type;
      if (mimeType.match(/image\/*/) == null) {
        continue;
      }

      const reader = new FileReader();
      reader.readAsDataURL(item);
      reader.onload = (_event) => {
        item.url = reader.result;
      }

      this.upload(item)

      this.files.push(item);
    }
  }



  upload(file: any): void {
    file.progress = 0;
    file.processing = true;

    this.uploadService.upload(file, this.path).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          file.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log(event.body);
          file.processing = false;
          file.ImageID = event.body.response;
        }
      },
      err => {
        file.progress = 0;
        console.log('Could not upload the file!');
        console.log(err);
        file.processing = false;
      });
  }

  getAllImage(path: string):void{

    this.uploadService.getFile(path).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
        } else if (event instanceof HttpResponse) {
          console.log(event.body);
          for (const imgID of event.body) {
            let item = {url:'', processing: false, ImageID:imgID}
            item.url = AppConfig.BaseUrl+'image/'+imgID;
            this.files.push(item);
          }
        }
      },
      err => {
        console.log('Could not get the file!');
        console.log(err);

      });

  }

}
