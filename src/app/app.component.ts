import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testZE';
  token: any;
  constructor(private appsv: AppService) {
    this.appsv.embedWidget(false);
  }
  ngOnInit() {
    this.appsv.pageInfo.subscribe((res) => {
      let appsv = this.appsv;
      if(res == "vip" || res == "normal") {
        window['zE']('webWidget:on', 'chat:end', function() {
          console.log("end chat");
          appsv.embedWidget(true);
        });
      }
      // console.log(res);
      
      // console.log(1);
      // this.appsv.u(true);
      // console.log(window['zE']('webWidget:get', 'chat:isChatting'))
    //   // if(window['zE'] != null) {
    //     window['zE']('webWidget:on', 'chat:connected', function() {
    //       // window['zE']('webWidget', 'show');
    //       console.log("hi")
    //     });
    //   //   console.log(window['zE']('webWidget:get', 'chat:isChatting'))
    //   // }
    //   // setTimeout(() => {
    //   //   console.log(res,  window['zE']('webWidget', 'chat:end'));
    //   // }, 6000);
      
    
    //   window['zE']('webWidget', 'chat:end');
    })
  }
}
