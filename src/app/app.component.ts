import { Component } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBeer } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faGift } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BIOMarket-routing';
  faBars = faBars;
  faUser = faUser;
  faBeer = faBeer;
  faShoppingCart = faShoppingCart;
  faCogs = faCogs;
  faImages = faImages;
  faBell = faBell;
  faGift = faGift;
}
