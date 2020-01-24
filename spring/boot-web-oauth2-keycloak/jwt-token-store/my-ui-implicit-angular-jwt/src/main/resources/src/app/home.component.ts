import {Component} from '@angular/core';
import { AppService } from './app.service'
 
@Component({
  selector: 'home-header',
  providers: [AppService],
  template: `<div class="container" > 
    <button *ngIf="!isLoggedIn" class="btn btn-primary" (click)="login()" type="submit">Login</button>
    <div *ngIf="isLoggedIn" class="content">
        <span>Welcome!!</span>
        <a class="btn btn-default pull-right" (click)="logout()" href="#">Logout</a>
        <br/>
        <product-details></product-details>
    </div>
</div>`
})
  
export class HomeComponent {
    public isLoggedIn = false;

    constructor(
        private _service:AppService){}
    
    ngOnInit(){
        this.isLoggedIn = this._service.isLoggedIn();
    }

    login() {
        this._service.obtainAccessToken();
    }

    logout() {
        this._service.logout();
    }
    
    get name() {
        return this._service.getName();
    }
}