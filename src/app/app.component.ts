import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggined: boolean = false;
  constructor(private appsv: AppService, private router: Router, private cookie: CookieService) {
    if(this.cookie.get('token')) { 
      this.isLoggined = true;
    }
    let arr = [
      '/otc',
      // '/login',
      '/normal'
    ]
    this.appsv.embedWidget();
    if(arr.includes(this.router.url)) {
      window['zE']('webWidget:on', 'chat:connected', function() {
        window['zE']('webWidget', 'show');
      });
    }
  }
  ngOnInit() {}
  goToOTC() {
    this.router.navigate(['otc'])
  }
  goToExchange(){
    this.router.navigate(['normal'])
  }
  logout(){
    this.cookie.delete("token");
    this.router.navigate(['login']);
  }
  login() {
    this.router.navigate(['login']);
  }
  embed() {
    this.appsv.embedWidget();
  }
}
