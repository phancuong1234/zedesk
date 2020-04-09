import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
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
export class NormalComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private appService: AppService, private cookie: CookieService) { }

  ngOnInit() {
    // if(localStorage.getItem('isLogin') == 'true') {
    //   console.log('hi')
      
    // }
    // window['zE']('webWidget:on', 'chat:connected', function() {
    //   console.log("2")
    // });
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
    await window['zE']('webWidget', 'logout');
  }

  async login() {
    await this.cookie.set('token', '123');
    await localStorage.setItem('isLogin', 'true');
    this.appService.embedWidget(true);
  }
  resetWidget() {
    var js = document.getElementById("ze-snippet");
    if(js !== null) {
        document.body.removeChild(js);
        console.info("---------- Script refreshed ----------");
    } 
    window['zEmbed'] = null;
    window['zE'] = null;
    
  }
  replace() {
    // var js = document.getElementById("ze-snippet");
    // if(js !== null) {
    //     document.body.removeChild(js);
    //     console.info("---------- Script refreshed ----------");
    // }
    // console.log(js.attributes)
    // var newElementScript = document.createElement("script");
    // newElementScript.setAttribute("id", "ze-snippet");
    // newElementScript["src"] = "assets/my.js";
    // document.body.appendChild(newElementScript);
  }
  async goToOtc() {
    await window['zE']('webWidget', 'chat:end');
    await this.appService.pageInfo.next("vip");
    this.router.navigate(['/otc']);
    // if(this.checkEndChatRun()) {
    //   this.router.navigate(['/otc']);
    // }
  }

  checkEndChatRun() {
    let stt = false;
    if(window['zE']('webWidget:get', 'chat:isChatting')) {
      window['zE']('webWidget', 'chat:end');
      window['zE']('webWidget:on', 'chat:end', function() {
        // window['zE']('webWidget', 'hide');
        stt = true
      });
    } else {
      // window['zE']('webWidget', 'hide');
      stt = true
    }
    return stt;
  }

  reload() {
    window['zE']('webWidget', 'chat:end');
    window.location.reload(false);
  }
  hide() {
    window['zE']('webWidget', 'hide');
  }
  show() {
    window['zE']('webWidget', 'show');
  }
   ngOnDestroy() {}
  reloadf() {
    // const elementToRemove = document.getElementById('ze-snippet');
    // const elementsWhichParentsToRemove = document.querySelectorAll('.zEWidget-launcher, .zEWidget-webWidget, [data-product="web_widget"]');
    // if (!!elementToRemove) {
    //   elementToRemove.remove();
    //   var newElementScript = document.createElement("script");
    //   newElementScript.setAttribute("id", "ze-snippet");
    //   let strjs = (elementToRemove.attributes[1]) ? elementToRemove.attributes[1]['value'].split("?time=")[0] : "https://static.zdassets.com/ekr/snippet.js?key=f1f7a3d1-bccc-4f7f-ac45-31db67977373";
    //   newElementScript["src"] = strjs + "?time=" + Math.floor(Math.random()* 10000000);
    //   document.body.appendChild(newElementScript);
    // }
    // if (!!elementsWhichParentsToRemove) {
    //   Array.from(elementsWhichParentsToRemove).forEach((element) => {
    //     element.remove()
    //   });
    // }
    // window['zEmbed'] = null;
    // window['zE'] = null;
    // window['zEmbed'] || function(e,t) {
    //   var n,o,d,i,s,a=[],r=document.createElement("iframe");
    //   window['zEmbed'] =function() {
    //     a.push(arguments)},
    //     window['zE'] = window['zE'] || window['zEmbed'],
    //     r.src="javascript:false",
    //     r.title="",
    //     r['role']="presentation",
    //     (r['frameElement']||r).style.cssText="display: none",
    //     d=document.getElementsByTagName("script"),
    //     d=d[d.length-1],d.parentNode.insertBefore(r,d),
    //     i=r.contentWindow,s=i.document;try{o=s}catch(e){
    //       n=document.domain,r.src='javascript:var d=document.open();d.domain="'+n+'";void(0);',
    //       o=s
    //     }
    //     o.open()._l=function(){
    //       var e=this.createElement("script");
    //       n&&(this.domain=n),e.id="js-iframe-async",
    //       e.src="https://assets.zendesk.com/embeddable_framework/main.js",
    //       this.t=+new Date,this.zendeskHost="cryptonomics.zendesk.com",
    //       this.zEQueue=a,this.body.appendChild(e)},
    //       o.write('<body onload="document._l();">'),
    //       o.close()
    //     }();
  }
}
