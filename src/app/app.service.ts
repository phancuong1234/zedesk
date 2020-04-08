import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: "root"
})
export class AppService {
    isLoggin: boolean = false;
    pageInfo:any = new BehaviorSubject("normal");
    constructor(private http: HttpClient){}
    getToken() {
        return this.http.get('http://127.0.0.1:8080/chat-token').subscribe(res => {
            this.authChatWidget(res);
        });
    }
    updateStt(stt: boolean) {
        this.isLoggin = stt;
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