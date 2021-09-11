import { SIGN_IN, SIGN_OUT } from './actionTypes';
import { SignInAction, SignOutAction, UserState } from './types';

export const signInAction = (
  userState: Omit<UserState, 'cart'>
): SignInAction => {
  const { isSignedIn, role, uid, username } = userState;

  return {
    type: SIGN_IN,
    payload: {
      isSignedIn,
      role,
      uid,
      username,
    },
  };
};

export const signOutAction = (): SignOutAction => {
  return {
    type: SIGN_OUT,
    payload: {
      isSignedIn: false,
      role: '',
      uid: '',
      username: '',
    },
  };
};
