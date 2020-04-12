import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private cookie: CookieService, private appService: AppService) { }

  ngOnInit(): void {
    this.checkToken();
  }
  async login() {
    await this.cookie.set('token', '123');
    this.appService.embedWidget();
  }
  checkToken() {
    if(!this.cookie.get("token")) {
      window['zE']('webWidget', 'logout');
    }
  }
}
