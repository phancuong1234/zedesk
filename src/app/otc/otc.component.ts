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
    // this.appService.u
  }
  getDepartment() {
    window['zE']('webWidget:on', 'chat:connected', function() {
      window['zE']('webWidget', 'show');
    });
    this.appService.getToken();
  }
  async back() {
    this.router.navigate(['/']);
    // if(this.checkEndChatRun()) {
    //   this.router.navigate(['/']);
    // }
  }
  // checkEndChatRun() {
  //   let stt = false;
  //   if(window['zE']('webWidget:get', 'chat:isChatting')) {
  //     window['zE']('webWidget', 'chat:end');
  //     window['zE']('webWidget:on', 'chat:end', function() {
  //       // window['zE']('webWidget', 'hide');
  //       stt = true
  //     });
  //   } else {
  //     // window['zE']('webWidget', 'hide');
  //     stt = true
  //   }

  //   return stt;
  // }
  reloadf() {
    

  }
  ngOnDestroy() {
    window['zE']('webWidget', 'chat:end');
    this.appService.pageInfo.next("normal");
  }
}
