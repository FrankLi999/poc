import { Action } from 'redux';

import {ThreadsReducer, ThreadsState} from './threads.reducer'
import { ADD_THREAD, addThread } from './thread.actions';
import { Thread } from './thread.model';
describe('thread reducer', () => {
    let initialState: ThreadsState = {
        ids: [],
        currentThreadId: null,
        entities: {}
    };
    let thread: Thread= {
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
      };
      let threads: ThreadsState  = {
        ids: ['id'],
        currentThreadId: null,
        entities:{id: thread}
      };  
   let addThreadAction = addThread(thread);

   let defaultAction: Action = {
    type: 'any'
   };
   
  it('should return the initial state', () => {
    expect(ThreadsReducer(undefined, defaultAction)).toEqual(initialState);
  })

  it('should handle ADD_TODO', () => {
    expect(
        ThreadsReducer(initialState, addThreadAction)
    ).toEqual(threads);
  })
})