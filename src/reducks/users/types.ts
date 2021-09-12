import { Action } from 'redux';
import { ProductInCart } from '../../types/Cart';
import { OrdersHistory } from '../../types/Order';
import {
  FETCH_ORDERS_HISTORY,
  FETCH_PRODUCTS_IN_CART,
  SIGN_IN,
  SIGN_OUT,
} from './actionTypes';

export type UserState = {
  isSignedIn: boolean;
  role: string;
  uid: string;
  username: string;
  cart: Array<ProductInCart>;
  orders: Array<OrdersHistory>;
};

export interface SignInAction extends Action {
  type: typeof SIGN_IN;
  payload: Omit<UserState, 'cart' | 'orders'>;
}

export interface SignOutAction extends Action {
  type: typeof SIGN_OUT;
  payload: Omit<UserState, 'cart' | 'orders'>;
}

export interface FetchProductsInCartAction extends Action {
  type: typeof FETCH_PRODUCTS_IN_CART;
  payload: Array<ProductInCart>;
}

export interface FetchOrdersHistoryAction extends Action {
  type: typeof FETCH_ORDERS_HISTORY;
  payload: Array<OrdersHistory>;
}

export type UserActionTypes =
  | SignInAction
  | SignOutAction
  | FetchProductsInCartAction
  | FetchOrdersHistoryAction;
