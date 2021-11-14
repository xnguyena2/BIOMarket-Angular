import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table'

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsersComponent } from './users/users.component';
import { BeersComponent } from './beers/beers.component';
import { OrdersComponent } from './orders/orders.component';
import { SettingComponent } from './setting/setting.component';
import { ImagesComponent } from './images/images.component';
import { DndDirective } from './directives/dnd.directive';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListBeerComponent } from './list-beer/list-beer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from './notification/notification.component';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';
import { NotificationDetailComponent } from './notification-detail/notification-detail.component';
import { ListVoucherComponent } from './list-voucher/list-voucher.component';
import { ListNotificationComponent } from './list-notification/list-notification.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './Injectable/AuthInterceptor ';
import { OrderdetailComponent } from './orderdetail/orderdetail.component';
import { MoneyFormatPipe } from './pipe/money-format.pipe';
import { AccountComponent } from './account/account.component';
import { VoucherComponent } from './voucher/voucher.component';
import { ProductImportComponent } from './product-import/product-import.component';
import { DatetimePipe } from './pipe/datetime.pipe';
import { ProductStatusPipe } from './pipe/product-status.pipe';
import { WebcreatorComponent } from './webcreator/webcreator.component';
import { NoSanitizePipe } from './pipe/no-sanitize.pipe';

const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    BeersComponent,
    OrdersComponent,
    SettingComponent,
    ImagesComponent,
    DndDirective,
    UploadImageComponent,
    BeerDetailComponent,
    PageNotFoundComponent,
    ListBeerComponent,
    NotificationComponent,
    VoucherDetailComponent,
    NotificationDetailComponent,
    ListVoucherComponent,
    ListNotificationComponent,
    LoginComponent,
    OrderdetailComponent,
    MoneyFormatPipe,
    AccountComponent,
    VoucherComponent,
    ProductImportComponent,
    DatetimePipe,
    ProductStatusPipe,
    WebcreatorComponent,
    NoSanitizePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/beers', pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      {
        path: 'beers', component: BeersComponent, children: [
          {
            path: '',
            component: ListBeerComponent
          },
          {
            path: 'beerdetail/:beerId',
            component: BeerDetailComponent
          }
        ]
      },
      { path: 'orders/:status', component: OrdersComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'images', component: ImagesComponent },
      { path: 'orderdetail/:orderid', component: OrderdetailComponent },
      {
        path: 'voucher', component: VoucherComponent, children: [
          {
            path: '',
            component: ListVoucherComponent
          },
          {
            path: 'voucherdetail/:voucherId',
            component: VoucherDetailComponent
          }
        ]
      },
      { path: 'notification', component: NotificationComponent },
      { path: 'login', component: LoginComponent },
      { path: 'account', component: AccountComponent },
      { path: 'analytics', component: ProductImportComponent },
      { path: 'webcreator', component: WebcreatorComponent },
      { path: '**', component: PageNotFoundComponent }
    ]),
    BrowserAnimationsModule,
    MatTableModule,
    NgbModule,
    FormsModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
