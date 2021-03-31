import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private api: APIService,
    private app: AppService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login(username: string , pw: string){
    this.api.AdminLogin({
      username: username,
      password: pw
    }, result =>{
      if(result){
        this.router.navigate(["/beers"]);
      }else{
        this.app.changeNotification("Error: Sai tên đăng nhập hoặc mật khẩu!");
      }
    })
  }

}
