import { SIGN_IN, SIGN_OUT } from './actionTypes';
import { SignInAction, SignOutAction, UserState } from './types';

export const signInAction = (
  userState: Omit<UserState, 'icon' | 'isSignedIn'>
): SignInAction => {
  return {
    type: SIGN_IN,
    payload: {
      isSignedIn: true,
      uid: userState.uid,
      username: userState.username,
    },
  };
};

export const signOutAction = (): SignOutAction => {
  return {
    type: SIGN_OUT,
    payload: {
      isSignedIn: false,
      uid: '',
      username: '',
    },
  };
};
