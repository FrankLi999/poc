import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
export class Product {
  constructor(
    public id: number,
    public version: number,
    public name: string,
    public available: boolean) { }
}

@Injectable()
export class AppService {
  constructor(
    private _router: Router, private _http: HttpClient){}
 
  obtainAccessToken(loginData){
    let params = new URLSearchParams();
    params.append('username',loginData.username);
    params.append('password',loginData.password);    
    params.append('grant_type','password');
    params.append('client_id','productClientIdPassword');

    const httpOptions = {
	  headers: new HttpHeaders({
	    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
	    'Authorization': 'Basic '+ btoa('productClientIdPassword:secret')
	  })
	};
    this._http.post('http://localhost:8081/spring-security-oauth-server/oauth/token', params.toString(), httpOptions)
    //.map(res => res.json())
    .subscribe(
      data => {
        console.log(data);
        this.saveToken(data);
      },
      err => { console.log(err); alert('Invalid Credentials')}
    ); 
  }


  saveToken(token){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set('access_token', token.access_token, expireDate);
    console.log('Obtained Access token');
    this._router.navigate(['/']);
  }

  getResource(resourceUrl) : Observable<Product>{
    const httpOptions = {
	  headers: new HttpHeaders({
	    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
	    'Authorization': 'Bearer '+ Cookie.get('access_token')
	  })
	};
    return this._http.get<Product>(resourceUrl, httpOptions)
       // .map((res:Response) => res.json())
       .pipe(catchError((error:any) => Observable.throw(error.json().error || 'Server error')));
  }

  checkCredentials(){
    if (!Cookie.check('access_token')){
        this._router.navigate(['/login']);
    }
  } 

  logout() {
    Cookie.delete('access_token');
    this._router.navigate(['/login']);
  }
}