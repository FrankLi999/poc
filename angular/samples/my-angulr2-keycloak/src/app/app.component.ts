import { Component } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {KeycloakService} from "./keycloak.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  products: string[] = [];
  constructor(private http: Http, private kc: KeycloakService) {}
  
  logout() {
    this.kc.logout();
    this.products = [];
  }
  
  reloadData() {
    this.products = ["prod1", "prod2"]
    //angular don't have http interceptor yet
  
    // this.http.get('/database/products')
    //   .map(res => res.json())
    //   .subscribe(prods => this.products = prods,
    //     error => console.log(error));
  }
}
