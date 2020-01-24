import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';

describe('DataService', () => { 

  let service: DataService;
  let http: HttpClient;

  beforeEach(() => {

     TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DataService
      ] 
    });

    service = TestBed.get(DataService);
    service.delay = 1;
    service.retries = 5;
    http = TestBed.get(HttpClient);
  });
  
   it('should retry 5 times if status is 503',  (done) => {
    
     spyOn(http, 'get').and.returnValue(Observable.throw({status: 503}));
     
     service.getDataWithConditionalRetry('/api/data')
            .subscribe(res => {},
            (error) => {
              expect(error).toEqual({error: 'Sorry, there was an error after 5 retries'});
              done(); 
            });
   });

   it('should not retry if status is not 503',  (done) => {
    
     spyOn(http, 'get').and.returnValue(Observable.throw({status: 404}));
     
     service.getDataWithConditionalRetry('/api/data')
            .subscribe(res => {},
            (error) => {
              expect(error).toEqual({error: 'No retry'});
              done(); 
            });
   });

});