import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export interface BeerBasicInfo {
  id:string;
  name: string;
  sold: number;
  order: number;
}
const ELEMENT_DATA: BeerBasicInfo[] = [
  { id: "123", name: 'Bia Nhập Lậu', sold: 1000, order: 10 },
];

@Component({
  selector: 'app-list-beer',
  templateUrl: './list-beer.component.html',
  styleUrls: ['./list-beer.component.css']
})
export class ListBeerComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'name', 'sold', 'order', 'delete', 'add'];
  data = Object.assign(ELEMENT_DATA);
  dataSource = new MatTableDataSource<Element>(this.data);
  faTrash = faTrash
  faPlus = faPlus

  constructor() { }

  ngOnInit(): void {
  }

  deleteProduct(product: BeerBasicInfo): void {
    let index: number = this.data.findIndex(d => d === product);
    this.data.splice(index, 1)
    this.dataSource.data = this.data
  }
}
