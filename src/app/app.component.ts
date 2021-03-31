import { Component, OnInit, ViewChild } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBeer } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BIOMarket-routing';
  faBars = faBars;
  faUser = faUser;
  faBeer = faBeer;
  faShoppingCart = faShoppingCart;
  faCogs = faCogs;
  faImages = faImages;
  faBell = faBell;
  faGift = faGift;

  alertMessage: string = '';
  showAlter: boolean = false;
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(private app: AppService) {

  }

  ngOnInit(): void {
    this.app.registerNotification(msg => {
      this.alertMessage = msg;
      this.showAlter = true;
    }, () => {
      this.alertMessage = '';
      this.showAlter = false;
    });
  }

}
