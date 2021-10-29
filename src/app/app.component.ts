import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBeer } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
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
  faTasks = faTasks;
  faChartBar = faChartBar;

  alertType: string;
  alertMessage: string = '';
  showAlter: boolean = false;

  totalOrderer: number = 0;

  haveNewOrderer: boolean = false;

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(private app: AppService,
    private router: Router,
    private titleService: Title) {
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.app.registerNotification(msg => {
      if (msg.indexOf('Error:') >= 0) {
        this.alertType = 'danger';
      } else {
        this.alertType = 'success';
      }
      this.alertMessage = msg;
      this.showAlter = true;
    }, () => {
      this.alertMessage = '';
      this.showAlter = false;
    });

    this.app.registerNewOrderNotification(msg => {
      this.haveNewOrderer = true;
      this.setTitle(msg);
      var audio = new Audio('/assets/popding.mp3');
      audio.play();
    });
  }

  showNewOrder(){
    this.router.navigate(["/orders", "new"]);
    this.haveNewOrderer=false;
    this.setTitle("Trùm Biển - Admin");
  }

}
