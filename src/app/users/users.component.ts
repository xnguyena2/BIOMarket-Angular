import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Buyer } from '../object/Buyer';
import { SearchQuery } from '../object/SearchQuery';
import { APIService } from '../services/api.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  readonly displayedColumns: string[] = ['UserName', 'region', 'district', 'ward', 'Address', 'Phone', 'Total'];

  listUser: Buyer[] = [];
  dataSource = new MatTableDataSource<Buyer>(this.listUser);

  constructor(private api: APIService,
    private app: AppService,) { }

  ngOnInit(): void {
    this.api.AdminGetAllBuyer(new SearchQuery('all', 0, 1000, 'DONE'), (result) => {
      if(result === null){
        this.app.changeNotification('Error: Không thể kết nối server!!!');
        return;
      }
      this.dataSource.data = result;
    });
  }

}
