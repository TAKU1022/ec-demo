import { Action } from 'redux';
import { ProductsInCart } from '../../types/Cart';
import { FETCH_PRODUCTS_IN_CART, SIGN_IN, SIGN_OUT } from './actionTypes';

export type UserState = {
  isSignedIn: boolean;
  role: string;
  uid: string;
  username: string;
  cart: Array<ProductsInCart>;
};

export interface SignInAction extends Action {
  type: typeof SIGN_IN;
  payload: Omit<UserState, 'cart'>;
}

export interface SignOutAction extends Action {
  type: typeof SIGN_OUT;
  payload: Omit<UserState, 'cart'>;
}

export interface FetchProductsInCartAction extends Action {
  type: typeof FETCH_PRODUCTS_IN_CART;
  payload: Array<ProductsInCart>;
}

export type UserActionTypes =
  | SignInAction
  | SignOutAction
  | FetchProductsInCartAction;
