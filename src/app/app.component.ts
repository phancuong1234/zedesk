import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testZE';
  token: any;
  constructor() {}
  ngOnInit() {
    window['zE']('webWidget', 'hide');
  }
  
}
