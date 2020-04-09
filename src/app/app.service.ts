import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: "root"
})
export class AppService {
    isLoggin: boolean = false;
    token: "";
    pageInfo:any = new BehaviorSubject("");
    constructor(private http: HttpClient){}
    async embedWidget(stt) {
        await this.getToken();
        this.loadWidget(stt);
        window['zE']('webWidget:on', 'chat:connected', function() {
            window['zE']('webWidget', 'show');
        });
    }
    getToken() {
        return this.http.post('http://localhost:8080/jwt/chat-token', {}).subscribe((res: any) => {
            this.authChatWidget(res.token);
        });
    }
    
    updateStt(stt: boolean) {
        this.isLoggin = stt;
    }

    loadWidget(actived) {
        const elementToRemove = document.getElementById('ze-snippet');
        const elementsWhichParentsToRemove = document.querySelectorAll('.zEWidget-launcher, .zEWidget-webWidget, [data-product="web_widget"]');
        if (!!elementToRemove) {
        elementToRemove.remove();
        var newElementScript = document.createElement("script");
        newElementScript.setAttribute("id", "ze-snippet");
        let strjs = (elementToRemove.attributes[1]) ? elementToRemove.attributes[1]['value'].split("?time=")[0] : "https://static.zdassets.com/ekr/snippet.js?key=f1f7a3d1-bccc-4f7f-ac45-31db67977373";
        newElementScript["src"] = strjs + "?time=" + Math.floor(Math.random()* 10000000);
        document.body.appendChild(newElementScript);
        }
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
        return window['zE']('webWidget', 'chat:end');
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