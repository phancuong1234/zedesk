import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-otc',
  templateUrl: './otc.component.html',
  styleUrls: ['./otc.component.css']
})
export class OtcComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private appService: AppService, private cookie: CookieService) { }

  async ngOnInit() {
    this.appService.embedWidget();
  }
  async ngOnDestroy() {
    if(this.cookie.get("token")) {
      this.appService.embedWidget();
    }
  }
}
