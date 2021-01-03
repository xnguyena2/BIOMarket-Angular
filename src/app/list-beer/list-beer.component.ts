import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export interface PeriodicElement {
  name: string;
  position:number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
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

  deleteProduct(product: PeriodicElement): void {
    console.log('delete:' + product);
    console.log(product);
    let index: number = this.data.findIndex(d => d === product);
    this.data.splice(index, 1)
    this.dataSource.data = this.data
  }
}
