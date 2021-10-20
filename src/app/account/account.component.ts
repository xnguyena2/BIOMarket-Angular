import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserDetail, UserEntity } from '../object/AdminLogin';
import { APIService } from '../services/api.service';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { SearchQuery } from '../object/SearchQuery';
import { UpdatePassword } from '../object/UpdatePassword';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  readonly displayedColumns: string[] = ['UserName', 'Role', 'CreatedBy', 'CreatedTime', 'delete', 'add'];

  listProduct: UserEntity[] = [];
  dataSource = new MatTableDataSource<UserEntity>(this.listProduct);
  faTrash = faTrash
  faPlus = faPlus

  username: string;
  role: string;

  isAdmin: boolean = false;

  updateOldPass: string;
  updateNewPass: string;
  updateNewPassConfirm: string;


  deleteOldPass: string;
  deleteOldPassConfirm: string;

  newuserName: string;
  newPassword: string;
  newConfirmPassword: string;
  newAccountRole: string;

  addNewAccountPopup: boolean = false;

  constructor(private api: APIService,
    private router: Router,
    private app: AppService,) { }

  ngOnInit(): void {

    this.api.AdminGetDetail(acc => {
      let accDetail = new UserDetail(acc);
      this.username = accDetail.name;
      this.role = accDetail.getRole();

      this.isAdmin = this.role === 'ROLE_ROOT' || this.role === 'ROLE_ADMIN';

      if (this.isAdmin){
        this.getallUser();
      }
    });

  }

  showAddAccount(showPopup: boolean) {
    this.addNewAccountPopup = showPopup;
    this.newuserName = null;
    this.newPassword = null;
    this.newConfirmPassword = null;
    this.newAccountRole = null;
  }

  getallUser() {
    if (this.isAdmin) {
      this.api.AdminGetAllUser(new SearchQuery('all', 0, 1000, ''), result => {
        this.dataSource.data = result.result;
      });
    }
  }

  deleteUser(username: string, pass: string, isSelfDelete: boolean) {

    let us: UpdatePassword = {
      username: username,
      oldpassword: pass,
      newpassword: '',
      roles: []
    };

    this.api.AdminDeleteUser(us, result => {
      if (result) {
        this.app.changeNotification('Xóa account thành công!!!');
        if(!isSelfDelete){
          this.getallUser();
        }
      } else {
        this.app.changeNotification('Error: Không thể xóa account!!!');
      }
    }, isSelfDelete);
  }

  selfDelete() {
    if (this.deleteOldPass !== this.deleteOldPassConfirm) {
      this.app.changeNotification('Error: Password not match!!!');
      return;
    }
    this.deleteUser(this.username, this.deleteOldPass, true);
  }

  updatePassword() {
    if (this.updateNewPass == null || this.updateNewPass == undefined || this.updateNewPass == '') {
      this.app.changeNotification('Error: Password empty!!!');
      return;
    }
    if (this.updateNewPass !== this.updateNewPassConfirm) {
      this.app.changeNotification('Error: Password not match!!!');
      return;
    }
    let us: UpdatePassword = {
      username: this.username,
      oldpassword: this.updateOldPass,
      newpassword: this.updateNewPass,
      roles: []
    };

    this.api.AdminUpdatePassUser(us, result => {
      if (result) {
        this.app.changeNotification('update account thành công!!!');
        this.router.navigate(['login']);
      } else {
        this.app.changeNotification('Error: update account failt!!!');
      }
    });
  }

  createNewAccount() {
    if (this.newuserName == null || this.newuserName == undefined || this.newuserName == '') {
      this.app.changeNotification('Error: User name empty!!!');
      return;
    }
    if (this.newPassword == null || this.newPassword == undefined || this.newPassword == '') {
      this.app.changeNotification('Error: Password empty!!!');
      return;
    }
    if (this.newPassword !== this.newConfirmPassword) {
      this.app.changeNotification('Error: Password not match!!!');
      return;
    }
    if (this.newAccountRole == null || this.newAccountRole == undefined || this.newAccountRole == '') {
      this.app.changeNotification('Error: Role empty!!!');
      return;
    }

    let us: UpdatePassword = {
      username: this.newuserName,
      oldpassword: this.newPassword,
      newpassword: this.newPassword,
      roles: [this.newAccountRole]
    };

    console.log(us);

    this.api.AdminCreateUser(us, result => {
      if (result) {
        this.app.changeNotification('update account thành công!!!');
        this.showAddAccount(false);
        this.getallUser();
      } else {
        this.app.changeNotification('Error: update account failt!!!');
      }
    });
  }

  logOut(){
    this.api.Logout(result => {
      if (result) {
        this.router.navigate(['login']);
      } else {
        this.app.changeNotification('Error: Can not connect to server!!!');
      }
    });
  }
}
