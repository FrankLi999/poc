import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {FetchService} from './fetch.service'; 
import {Thread} from './thread.model'; 
export const FETCH_THREADS_REQUEST = 'FETCH_THREADS_REQUEST';
export const FETCH_THREADS_SUCCESS = 'FETCH_THREADS_SUCCESS';
export const FETCH_THREADS_FAILURE = 'FETCH_THREADS_FAILURET';

function fetchThreadRequest() {
  return {
    type: FETCH_THREADS_REQUEST
  }
}

function fetchTodosSuccess(body) {
  return {
    type: FETCH_THREADS_SUCCESS,
    body: body
  }
}

function fetchTodosFailure(ex) {
  return {
    type: FETCH_THREADS_FAILURE,
    error: ex
  }
}

export function fetchThreads(service: FetchService) {
  return dispatch => {
    dispatch(fetchThreadRequest())
    return service.getThreads()
    .map((res: Thread[]) => dispatch(fetchTodosSuccess(res)))
    .catch((error: any) => dispatch(fetchTodosFailure(error)));
  }
}