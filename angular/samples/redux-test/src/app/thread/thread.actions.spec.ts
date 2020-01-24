import { 
    addThread,
    ADD_THREAD,
    addMessage,
    ADD_MESSAGE,
    selectThread,
    SELECT_THREAD
} from './thread.actions'
import { Thread } from './thread.model'

describe('Thread actions', () => {
  it('should create an addThread action to add a todo', () => {
    const thread = 'thread1'
    const expectedAction = {
      type: ADD_THREAD,
      thread: thread
    }
    expect(addThread(thread)).toEqual(expectedAction)
  })
})

describe('Message actions', () => {
    it('should create an addMessage action to add a todo', () => {
        const thread = 'thread1'
        const msg = {
            id: 'uuid',
            sentAt: new Date(),
            isRead: false,
            thread: thread
          };
        const expectedAction = {
            type: ADD_MESSAGE,
            thread: thread,
            message: msg
        }
        expect(addMessage(thread, msg)).toEqual(expectedAction)
    })
})

describe('SelectThread actions', () => {
    it('should create an selectThread action to add a todo', () => {
        const thread = 'thread1'
        const expectedAction = {
            type: SELECT_THREAD,
            thread: thread
        }
        expect(selectThread(thread)).toEqual(expectedAction)
    })
})