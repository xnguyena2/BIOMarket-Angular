import { Component, OnInit } from '@angular/core';
import { UserDetail } from '../object/AdminLogin';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  username: string;
  role: string;

  constructor(private api: APIService) { }

  ngOnInit(): void {
    this.api.AdminGetDetail(acc => {
      let accDetail = new UserDetail(acc);
      this.username = accDetail.name;
      this.role = accDetail.getRole();
    });
  }

}
