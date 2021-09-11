import { Action } from 'redux';
import { ProductsInCart } from '../../types/Cart';
import { SIGN_IN, SIGN_OUT } from './actionTypes';

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

export type UserActionTypes = SignInAction | SignOutAction;
