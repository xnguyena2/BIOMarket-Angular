import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table'

import { HttpClientModule } from '@angular/common/http';

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
    BeerDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      { path: '', component: UsersComponent },
      { path: 'users', component: UsersComponent },
      { path: 'beers', component: BeersComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'images', component: ImagesComponent },
    ]),
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
