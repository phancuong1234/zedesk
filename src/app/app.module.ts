import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OtcComponent } from './otc/otc.component';
import { RouterModule, Routes } from '@angular/router';
import { NormalComponent } from './normal/normal.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'normal', component: NormalComponent },
  { path: 'otc', component: OtcComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    OtcComponent,
    NormalComponent,
    LoginComponent
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
