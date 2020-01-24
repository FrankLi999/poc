import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Thread }     from './thread.model';
import { FetchService } from './fetch.service';
import {
  FETCH_THREADS_REQUEST,
  FETCH_THREADS_SUCCESS,
  FETCH_THREADS_FAILURE,
  fetchThreads
} from './async-thread-sample.action';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const thread: Thread[] = [{
  id: 'id',
  name: 'thread1',
  avatarSrc: 'avatarSrc',
  messages: [{
    id: 'id',
    sentAt: new Date(),
    isRead: true,
    thread: null,
    author: null,
    text: 'text'}]
}]
class MockFetchService extends FetchService {
  getThreads (): Observable<Thread[]> {
    return Observable.of(thread);
  }
}
describe('async fetch thread actions', () => {
  let mockService = new MockFetchService(null);
  it('creates FETCH_THREADS_SUCCESS when fetching thread has been done', () => {
   const expectedActions = [
      { type: FETCH_THREADS_REQUEST },
      { type: FETCH_THREADS_SUCCESS, body:thread }
    ]
    const store = mockStore({ threads: [] })

    return store.dispatch(fetchThreads(mockService)).map(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})