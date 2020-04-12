import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: "root"
})
export class AppService {
    constructor(private http: HttpClient, private cookie: CookieService){}
    async embedWidget() {
        if(this.cookie.get('token')) {
            await this.getJWTToken();
        }
        if(window['zE'] != undefined) {
            window['zE']('webWidget', 'hide');
            if(window["zE"]('webWidget:get', 'chat:isChatting') == undefined || window["zE"]('webWidget:get', 'chat:isChatting') == true) {
                window["zE"]("webWidget:on", "chat:end", () => {
                    this.loadWidget();
                });
                await window["zE"]("webWidget", "chat:end");
                await this.updateDepartment();
            } else {
                this.loadWidget();
            }
        } else {
            this.loadWidget();
        }
    }
    updateDepartment() {
        if(window['zE'] != undefined){
            console.log('cap nhat department', window.location.href);
            window['zE']('webWidget', 'updatePath');
        }
    }
    endChat() {
        if(window['zE'] != undefined){
            console.log("end-chat")
                window["zE"]("webWidget", "chat:end"); 
            // return ;
        }
    }
    getJWTToken() {
        return this.http.post('http://localhost:8080/jwt/chat-token', {}).subscribe((res: any) => {
            this.authChatWidget(res.token);
        });
    }
    loadWidget() {
        console.log('load widget');
        let elementsWhichParentsToRemove = document.querySelectorAll('.zEWidget-launcher, .zEWidget-webWidget, [data-product="web_widget"]');
        if (!!elementsWhichParentsToRemove) {
        console.log(elementsWhichParentsToRemove)
        Array.from(elementsWhichParentsToRemove).forEach((element) => {
            element.remove()
        });
        }
        window['zEmbed'] = null;
        window['zE'] = null;
        window['zEmbed'] || function(e,t) {
        var n,o,d,i,s,a=[],r=document.createElement("iframe");
        window['zEmbed'] =function() {
            a.push(arguments)
        },
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
            this.zEQueue=a,this.body.appendChild(e)
        },
        o.write('<body onload="document._l();">'),
        o.close()
        }();
        return ;
    }
    authChatWidget(token){
        window['zESettings'] = {
            webWidget: {
                authenticate: {
                    chat: {
                        jwtFn: function(callback) {
                        callback(token);
                        }
                    }
                }
            }
        };
    }
}