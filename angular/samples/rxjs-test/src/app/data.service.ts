import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retrywhen';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/concat';

@Injectable()
export class DataService { 
  delay = 1000;
  retries = 5;

  constructor(private http: HttpClient) {}

  getDataWithConditionalRetry(url) {
    return this.http.get(url)
               .retryWhen(error => {
                  return error
                  .mergeMap((error: any) => {
                    if(error.status  === 503) {
                      return Observable.of(error.status).delay(this.delay)
                    }
                    return Observable.throw({error: 'No retry'});
                  })
                  .take(this.retries)
                  .concat(Observable.throw({error: `Sorry, there was an error after ${this.retries} retries`}));
               });
  }
}