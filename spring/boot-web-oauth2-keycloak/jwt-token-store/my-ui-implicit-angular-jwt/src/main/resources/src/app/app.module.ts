import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule }   from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { ProductComponent } from './product.component';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HomeComponent      
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // HttpModule,
    HttpClientModule,
    OAuthModule.forRoot(),    
    RouterModule.forRoot([
     { path: '', component: HomeComponent }])
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
