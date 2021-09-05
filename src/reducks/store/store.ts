import {
  connectRouter,
  routerMiddleware,
  RouterState,
} from 'connected-react-router';
import { History } from 'history';
import { Reducer } from 'react';
import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
  AnyAction,
} from 'redux';
import thunk from 'redux-thunk';
import { ProductsReducer } from '../products/reducers';
import { ProductsState } from '../products/types';
import { UsersReducer } from '../users/reducers';
import { UserState } from '../users/types';

export type RootState = {
  router: Reducer<RouterState, AnyAction>;
  users: UserState;
  products: ProductsState;
};

export const createStore = (history: History) => {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer,
      products: ProductsReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk)
  );
};
