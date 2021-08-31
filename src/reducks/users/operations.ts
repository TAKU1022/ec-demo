import { push } from 'connected-react-router';
import { Dispatch } from 'react';
import { auth, db, FirebaseTimestamp } from '../../firebase';
import { signInAction } from './actions';

export const signIn = (email: string, password: string) => {
  return async (dispatch: Dispatch<any>) => {
    if (email === '' || password === '') {
      alert('必須項目が未入力です');
      return;
    }

    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;

        db.collection('users')
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data?.role,
                uid,
                username: data?.username,
              })
            );

            dispatch(push('/'));
          });
      }
    });
  };
};

export const signUp = (
  username: string,
  email: string,
  password: string,
  confirmPasword: string
) => {
  return async (dispach: Dispatch<any>) => {
    if (
      username === '' ||
      email === '' ||
      password === '' ||
      confirmPasword === ''
    ) {
      alert('必須項目が未入力です');
      return;
    }

    if (password !== confirmPasword) {
      alert('パスワードが一致しません。もう１度お試しください。');
      return;
    }

    auth.createUserWithEmailAndPassword(email, password).then((result) => {
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
