import {
  Component,
  Input
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from 'redux';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { AppStore } from '../app.store';
import { AppState, ThreadsState } from '../app.reducer';
import { Thread } from '../thread/thread.model';
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

import { ChatThreadsComponent } from './chat-threads.component';

function createAppStore(): Store<AppState> {
  const thread: Thread = {
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
    currentThreadId: 'id',
    entities:{id: thread}
  };  
  return mockStore({ 
    users: {},
    threads: threads})
}

@Component({
  selector: 'chat-thread',
  template: 'chat-threads mock'
})
export class ChatThreadMockComponent {
  @Input() thread: Thread;
  @Input() selected: boolean;
}
describe('ChatThreadsComponent', () => {
  let component: ChatThreadsComponent;
  let fixture: ComponentFixture<ChatThreadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatThreadsComponent, ChatThreadMockComponent ],
      providers: [
        { provide: AppStore, useFactory: createAppStore }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatThreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all threads', () => {
     expect(component.currentThreadId).toBe('id');
     expect(component.threads.length).toBe(1);
  });
});
