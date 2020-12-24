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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListBeerComponent } from './list-beer/list-beer.component';

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
    ListBeerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/users', pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      {
        path: 'beers', component: BeersComponent, children: [
          {
            path: '',
            component: ListBeerComponent},
          {
            path: 'beerdetail/:beerId',
            component: BeerDetailComponent
          }
        ]
      },
      { path: 'orders', component: OrdersComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'images', component: ImagesComponent },
      { path: '**', component: PageNotFoundComponent }
    ]),
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
