import { push } from 'connected-react-router';
import { Dispatch } from 'react';
import { signInAction } from './actions';

export const signIn = () => {
  return async (dispatch: Dispatch<any>, getState: any) => {
    const state = getState();
    const isSignedIn = state.users.isSignedIn;

    if (!isSignedIn) {
      const url = 'https://api.github.com/users/TAKU1022';
      const response = await fetch(url)
        .then((res) => res.json())
        .catch(() => null);
      const username = response.login;

      dispatch(
        signInAction({
          uid: '00001',
          username,
        })
      );
      dispatch(push('/'));
    }
  };
};
