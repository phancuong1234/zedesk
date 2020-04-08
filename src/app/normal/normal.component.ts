import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { CookieService } from "ngx-cookie-service";
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-normal',
  templateUrl: './normal.component.html',
  styleUrls: ['./normal.component.css']
})
export class NormalComponent implements OnInit {
  constructor(private router: Router, private appService: AppService, private cookie: CookieService) { }

  ngOnInit() {
    window['zE']('webWidget:on', 'chat:connected', function() {
      console.log('hi')
      window['zE']('webWidget', 'show');
    });
    if(localStorage.getItem('isLogin') == 'true') {
      this.appService.getToken();
    }
    window['zE']('webWidget:on', 'chat:connected', function() {
      window['zE']('webWidget', 'updateSettings', {
        webWidget: {
          chat: {
            departments: {
              select: '2147656471'
            }
          }
        }
      });
    });
    
  }

  updatePath() {
    window['zE']('webWidget', 'updatePath', {
      url: 'http://example.com',
      title: "Ready to rock'n'roll!"
    });
  }

  endChat() {
    window['zE']('webWidget', 'chat:end');
  }

  async logout() {
    localStorage.setItem('isLogin', 'false');
    window['zE']('webWidget', 'logout');
    window.location.reload(false);
    // window['zE']('webWidget:on', 'chat:status', function(status) {
    //   console.log('This chat session is now', status);
    // });
    // window['zE']('webWidget:on', 'chat:connected', function() {
    //   console.log('successfully connected to Zendesk Chat!');
    // });
  }

  async login() {
    await this.cookie.set('token', '123');
    // var js = document.getElementById("ze-snippet");
    // if(js !== null) {
    //     document.body.removeChild(js);
    //     console.info("---------- Script refreshed ----------");
    // }
    // // console.log(js.attributes);

    // // Create new script element and load a script into it
    // var newElementScript = document.createElement("script");
    // newElementScript.setAttribute("id", "ze-snippet");
    // newElementScript.setAttribute("src", js.attributes[1]['value'].split("?time=")[0] + "?time=" + Math.floor(Math.random()* 10000000));
    // document.body.append(newElementScript);
    // console.log(1);
    await localStorage.setItem('isLogin', 'true');
    await this.appService.getToken();
    // console.log(2)
    window.location.reload(true);
  }

  goToOtc() {
    if(window['zE']('webWidget:get', 'chat:isChatting')) {
      window['zE']('webWidget', 'chat:end');
      window['zE']('webWidget:on', 'chat:end', function() {
        window.location.reload(false);
        window.location.href = "/otc";
      });
    } else {
      window.location.reload(false);
      window.location.href = "/otc";
    }
    
    // this.router.navigateByUrl('otc');
  }
  reload() {
     window['zE']('webWidget', 'chat:end');
    window.location.reload(false);
  }
  ngDestroy() {

  }
}
