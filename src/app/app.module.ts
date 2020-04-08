import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OtcComponent } from './otc/otc.component';
import { RouterModule, Routes } from '@angular/router';
import { NormalComponent } from './normal/normal.component';

const appRoutes: Routes = [
  { path: '', component: NormalComponent },
  { path: 'otc', component: OtcComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    OtcComponent,
    NormalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
