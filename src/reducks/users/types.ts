import { Action } from 'redux';
import { SIGN_IN, SIGN_OUT } from './actionTypes';

export type UserState = {
  icon: string;
  isSignedIn: boolean;
  uid: string;
  username: string;
};

export interface SignInAction extends Action {
  type: typeof SIGN_IN;
  payload: Omit<UserState, 'icon'>;
}

export interface SignOutAction extends Action {
  type: typeof SIGN_OUT;
  payload: Omit<UserState, 'icon'>;
}

export type UserActionTypes = SignInAction | SignOutAction;
