import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private api: APIService,
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
      }
    })
  }

}
