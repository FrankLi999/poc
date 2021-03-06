import { Reducer, Action } from 'redux';
export const ADD_TICKET = 'ADD_TICKET';
export const REMOVE_TICKET = 'REMOVE_TICKET';

export const ticketsReducer: Reducer<number> = (state = 0, action: Action): number => {
  switch (action.type) {
    case ADD_TICKET: return state + 1;
    case REMOVE_TICKET: return Math.max(0, state - 1);
  }
  return state;
}

// Basic reducer logic.
export const animalComponentReducer: Reducer<any> = (state: any = {}, action: Action): {} => ({
  ...state,
  tickets: ticketsReducer(state.tickets, action),
});
