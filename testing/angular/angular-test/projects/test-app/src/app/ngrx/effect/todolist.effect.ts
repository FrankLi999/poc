export class TodoListEffects {}
// @Injectable()
// export class TodoListEffects {
//   constructor(
//     private actions$: Actions,
//     private todoListService: TodoListService
//   ) {}

//   @Effect()
//   loadTodoList$ = this.actions$.pipe(
//     ofType(TodoListActionTypes.LoadTodoList),
//     exhaustMap(() => this.todoListService.getTodos()),
//     map(todoList => new TodoItemsLoaded(todoList)),
//     catchError((error: Error) => of(new TodoItemsLoadFailed(error)))
//   );
// }
