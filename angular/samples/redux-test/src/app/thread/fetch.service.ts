import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Thread } from './thread.model';

@Injectable()
export class FetchService {
  private _threadsUrl = 'app/threads';  // URL to web api

  constructor (private http: Http) {}

  getThreads (): Observable<Thread[]> {
    return this.http.get(this._threadsUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  
  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body || { };
  }

  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
