import { Component, OnInit, Injectable } from '@angular/core';
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
export class OtcComponent implements OnInit {

  constructor(private route: Router, private appService: AppService, private cookie: CookieService) { }

  ngOnInit() {
    // if(!window['zE']('webWidget:get', 'chat:isChatting')) {
    //   window.location.reload(false);
    // }
    // console.log(this.cookie.get('token'));
    window['zE']('webWidget:on', 'chat:connected', function() {
      console.log('hi')
      window['zE']('webWidget', 'show');
    });
    this.appService.getToken();
  }
  getDepartment() {
    let a = window['zE']('webWidget:get', 'chat:department', '2147656471');
      console.log(a); 
    // window['zE']('webWidget:on', 'chat:connected', function() {
      
    //   // window['zE']('webWidget', 'updateSettings', {
    //   //   webWidget: {
    //   //     chat: {
    //   //       departments: {
    //   //         select: 'Privileged'
    //   //       }
    //   //     }
    //   //   }
    //   // });
    // });
  }
  back() {
    if(window['zE']('webWidget:get', 'chat:isChatting')) {
      window['zE']('webWidget', 'chat:end');
      window['zE']('webWidget:on', 'chat:end', function() {
        window.location.reload(false);
        window.location.href = "/";
      });
    } else {
      window.location.reload(false);
      window.location.href = "/";
    }
    // this.route.navigateByUrl('/');
  }
  ngDestroy() {}
}
