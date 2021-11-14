import { Component, OnInit, Input } from '@angular/core';

import { UploadFileService } from 'src/app/services/upload-file.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Image } from '../object/BeerDetail';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  @Input() title: string;
  path: string;

  files: Image[] = [];
  faTrash = faTrash

  constructor(private uploadService: UploadFileService) { }

  ngOnInit(): void {
  }

  setPath(p: string): void {
    this.path = p;
  }

  loadAllImage() {
    this.getAllImage(this.path + '/all');
  }

  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  deleteFile(imgID: string) {
    if (confirm('Are you sure?')) {
      this.uploadService.deleteFile(this.path + '/delete', imgID).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
          } else if (event instanceof HttpResponse) {
            console.log(event.body);

            let index: number = this.files.findIndex(d => d.imgid === imgID);
            this.files.splice(index, 1);
          }
        },
        err => {
          console.log('Could not delete the file!');
          console.log(err);

        });
    }
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

    this.uploadService.upload(file, this.path + '/upload').subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          file.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          const newImg: Image = event.body;
          console.log(newImg);
          file.imgid = newImg.imgid;
          file.large = newImg.large;
          file.processing = false;
        }
      },
      err => {
        file.progress = 0;
        console.log('Could not upload the file!');
        console.log(err);
        file.processing = false;
      });
  }

  getAllImage(path: string): void {

    this.uploadService.getFile(path).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
        } else if (event instanceof HttpResponse) {
          console.log(event.body);
          this.files = event.body;
        }
      },
      err => {
        console.log('Could not get the file!');
        console.log(err);

      });

  }

}
