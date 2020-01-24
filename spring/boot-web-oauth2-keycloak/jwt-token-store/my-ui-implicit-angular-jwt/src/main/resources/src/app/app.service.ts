import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
// import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  OAuthService, 
  AuthConfig,
  JwksValidationHandler, 
} from 'angular-oauth2-oidc';

export class Product {
  constructor(
    public id: number,
    public version: number,
    public name: string,
    public available: boolean) { }
}

@Injectable()
export class AppService {
  private authConfig: AuthConfig = {

    // Url of the Identity Provider
	// issuer: 'https://steyer-identity-server.azurewebsites.net/identity',
	
	// URL of the SPA to redirect the user to after login
	// redirectUri: window.location.origin + '/index.html',
	redirectUri: 'http://localhost:8086/',
    // The SPA's id. The SPA is registerd with this id at the auth-server
    clientId: 'sampleClientId',
    // set the scope for the permissions the client should request
    // The first three are defined by OIDC. The 4th is a usecase-specific one
    scope: 'product read write',
    loginUrl: 'http://localhost:8081/spring-security-oauth-server/oauth/authorize',
    oidc: false,
    // responseType: 'token',
    // requireHttps: 'remoteOnly'
    requireHttps: false
  }
  constructor(
    private _router: Router, 
    private _http: HttpClient, 
    private oauthService: OAuthService) {
      // this.oauthService.loginUrl = 'http://localhost:8081/spring-security-oauth-server/oauth/authorize'; 
      // this.oauthService.redirectUri = 'http://localhost:8086/';
      // this.oauthService.clientId = "sampleClientId";
      // this.oauthService.scope = "product read write";    
      this.oauthService.configure(this.authConfig);
      this.oauthService.tokenValidationHandler = new JwksValidationHandler();
      // this.oauthService.setStorage(sessionStorage);
      // this.oauthService.oidc = false;
      // this.oauthService.loadDiscoveryDocumentAndTryLogin();
      this.oauthService.tryLogin({});      
    }
 
  obtainAccessToken() {
      this.oauthService.initImplicitFlow();
  }

  getResource(resourceUrl) : Observable<Product> {
    // var headers = new HttpHeaders({
    //   'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 
    //   'Authorization': 'Bearer '+ Cookie.get('access_token')
    // });
    const httpOptions = {
	  headers: new HttpHeaders({
	    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 
        'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
	  })
	};
    return this._http.get<Product>(resourceUrl, httpOptions)
      //.map((res:Response) => res.json())
      .pipe(catchError((error:any) => Observable.throw(error.json().error || 'Server error')));
  }

  isLoggedIn(){
    if (this.oauthService.getAccessToken() === null) {
       return false;
    }  
    return true;
  } 

  logout() {
      this.oauthService.logOut();
      location.reload();
  }
  
  getName() {
    let claims = this.oauthService.getIdentityClaims();
    console.log(claims)
    if (!claims) return null;
    return null; //claims.given_name;
  }
  
}