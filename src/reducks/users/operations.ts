import { push } from 'connected-react-router';
import { Dispatch } from 'react';
import { auth, db, FirebaseTimestamp } from '../../firebase';
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

export const signUp = (
  username: string,
  email: string,
  pasword: string,
  confirmPasword: string
) => {
  return async (dispach: Dispatch<any>) => {
    if (
      username === '' ||
      email === '' ||
      pasword === '' ||
      confirmPasword === ''
    ) {
      alert('必須項目が未入力です');
      return;
    }

    if (pasword !== confirmPasword) {
      alert('パスワードが一致しません。もう１度お試しください。');
      return;
    }

    return auth
      .createUserWithEmailAndPassword(email, pasword)
      .then((result) => {
        const user = result.user;

        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            createdAt: timestamp,
            email,
            role: 'customer',
            uid,
            updatedAt: timestamp,
            username,
          };

          db.collection('users')
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              dispach(push('/'));
            });
        }
      });
  };
};
