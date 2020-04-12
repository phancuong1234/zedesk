import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-normal',
  templateUrl: './normal.component.html',
  styleUrls: ['./normal.component.css']
})
export class NormalComponent implements OnInit, OnDestroy {
  constructor() { }

  ngOnInit() {}
  
   ngOnDestroy() {}
}
