import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';



import { SearchQuery } from '../object/SearchQuery';
import { APIService } from '../services/api.service';
import { BeerDetail } from '../object/BeerDetail';

@Component({
  selector: 'app-list-beer',
  templateUrl: './list-beer.component.html',
  styleUrls: ['./list-beer.component.css']
})
export class ListBeerComponent implements OnInit {

  readonly maxSearResult: number = 1000;

  displayedColumns: string[] = ['name', 'sold', 'order', 'delete', 'add'];
  listProduct: BeerDetail[] = [];
  dataSource = new MatTableDataSource<BeerDetail>(this.listProduct);
  faTrash = faTrash
  faPlus = faPlus

  constructor(private api: APIService) { }

  ngOnInit(): void {
    this.api.SearchBeer(new SearchQuery('all', 0, this.maxSearResult, ''), (success, result) => {
      this.listProduct = result.result.sort((n1, n2) => {
        if (n1.name > n2.name) {
          return 1;
        }

        if (n1.name < n2.name) {
          return -1;
        }

        return 0;
      });
      this.dataSource.data = this.listProduct;
      this.api.RefreshToken();
      if (success) {
        this.api.Stream();
      }
    });
  }

  deleteProduct(product: BeerDetail): void {
    if (confirm('Are you sure?')) {
      this.api.Delete(product.beerSecondID, result => {
        if (result) {
          let index: number = this.listProduct.findIndex(d => d === product);
          this.listProduct.splice(index, 1);
          this.dataSource.data = this.listProduct;
        }
      });
    }
  }
}
