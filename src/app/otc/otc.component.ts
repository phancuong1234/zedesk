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

  constructor(private router: Router, private appService: AppService, private cookie: CookieService) { }

  ngOnInit() {
    // window['zE']('webWidget:on', 'chat:end', function() {
      this.reloadf();
    // });
    
    // if(!window['zE']('webWidget:get', 'chat:isChatting')) {
    //   window.location.reload(false);
    // }
    // console.log(this.cookie.get('token'));
    window['zE']('webWidget:on', 'chat:connected', function() {
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
    this.router.navigateByUrl("/");
  }
  reloadf() {
    const elementToRemove = document.getElementById('ze-snippet');
    const elementsWhichParentsToRemove = document.querySelectorAll('.zEWidget-launcher, .zEWidget-webWidget, [data-product="web_widget"]');
    if (!!elementToRemove) {
      elementToRemove.remove();
    }
    if (!!elementsWhichParentsToRemove) {
      Array.from(elementsWhichParentsToRemove).forEach((element) => {
        console.log(element)
        element.remove()
      });
    }
    window['zEmbed'] = null;
    window['zE'] = null;
    window['zEmbed'] || function(e,t) {
      var n,o,d,i,s,a=[],r=document.createElement("iframe");
      window['zEmbed'] =function() {
        a.push(arguments)},
        window['zE'] = window['zE'] || window['zEmbed'],
        r.src="javascript:false",
        r.title="",
        r['role']="presentation",
        (r['frameElement']||r).style.cssText="display: none",
        d=document.getElementsByTagName("script"),
        d=d[d.length-1],d.parentNode.insertBefore(r,d),
        i=r.contentWindow,s=i.document;try{o=s}catch(e){
          n=document.domain,r.src='javascript:var d=document.open();d.domain="'+n+'";void(0);',
          o=s
        }
        o.open()._l=function(){
          var e=this.createElement("script");
          n&&(this.domain=n),e.id="js-iframe-async",
          e.src="https://assets.zendesk.com/embeddable_framework/main.js",
          this.t=+new Date,this.zendeskHost="cryptonomics.zendesk.com",
          this.zEQueue=a,this.body.appendChild(e)},
          o.write('<body onload="document._l();">'),
          o.close()
        }();

  }
  ngDestroy() {
    if(window['zE']('webWidget:get', 'chat:isChatting')) {
      window['zE']('webWidget', 'chat:end');
      window['zE']('webWidget:on', 'chat:end', function() {
        window['zE']('webWidget', 'hide');
      });
    } else {
      window['zE']('webWidget', 'hide');
    }
  }
}
