import { Action } from 'redux';
import { SIGN_IN, SIGN_OUT } from './actionTypes';

export type UserState = {
  isSignedIn: boolean;
  role: string;
  uid: string;
  username: string;
};

export interface SignInAction extends Action {
  type: typeof SIGN_IN;
  payload: UserState;
}

export interface SignOutAction extends Action {
  type: typeof SIGN_OUT;
  payload: UserState;
}

export type UserActionTypes = SignInAction | SignOutAction;
