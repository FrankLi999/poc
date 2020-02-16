import { TodoListState, TodoListInitState } from "./totolist.model";
export const todoListReducers: any = {};
// export const todoListReducers = (
//   lastState: TodoListState = new TodoListInitState(),
//   action: GenericAction<TodoListActionTypes, any>
// ): TodoListState => {
//   switch (action.type) {
//     case TodoListActionTypes.LoadTodoList:
//       return loadTodoItems(lastState, action);
//     case TodoListActionTypes.TodoItemsLoaded:
//       return todoItemsLoaded(lastState, action);
//     case TodoListActionTypes.TodoItemsLoadFailed:
//       return todoItemsLoadFailed(lastState, action);
//     case TodoListActionTypes.TodoItemCreated:
//       return todoItemCreatedReducer(lastState, action);
//     case TodoListActionTypes.TodoItemsLoadFailed:
//       return todoItemsLoadFailed(lastState, action);
//     case TodoListActionTypes.TodoItemDeleted:
//       return todoItemDeletedReducer(lastState, action);
//     case TodoListActionTypes.TodoItemUpdated:
//       return todoItemUpdatedReducer(lastState, action);
//     case TodoListActionTypes.TodoItemCompleted:
//       return todoItemCompletedReducer(lastState, action);

//     default:
//       return lastState;
//   }
// };
