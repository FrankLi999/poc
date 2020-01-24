import { Component } from '@angular/core';
import { AppService, Product } from './app.service'

@Component({
  selector: 'product-details',
  providers: [AppService],  
  template: `<div class="container">
    <h1 class="col-sm-12">product Details</h1>
    <div class="col-sm-12">
        <label class="col-sm-3">ID</label> <span>{{product.id}}</span>
    </div>
    <div class="col-sm-12">
        <label class="col-sm-3">Name</label> <span>{{product.name}}</span>
    </div>
    <div class="col-sm-12">
        <button class="btn btn-primary" (click)="getProduct()" type="submit">New product</button>        
    </div>
</div>`
})

export class ProductComponent {
    public product = new Product(2 ,1,'sample prod', false);
    private productUrl = 'http://localhost:8082/product/';  

    constructor(private _service:AppService) {}

    getProduct(){
        this._service.getResource(this.productUrl + this.product.id)
         .subscribe(
                     data => this.product = data,
                     error =>  this.product.name = 'Error');
    }
}
