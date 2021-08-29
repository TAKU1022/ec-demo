import { createStore as reduxCreateStore, combineReducers } from 'redux';
import { UsersReducer } from '../users/reducers';
import { UserState } from '../users/types';

export type RootState = {
  users: UserState;
};

export const createStore = () => {
  return reduxCreateStore(
    combineReducers({
      users: UsersReducer,
    })
  );
};
