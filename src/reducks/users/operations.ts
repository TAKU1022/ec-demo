import { push } from 'connected-react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { auth, db, FirebaseTimestamp } from '../../firebase';
import { RootState } from '../store/store';
import { signInAction, signOutAction } from './actions';

export const listenAuthState = () => {
  return async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
    return auth.onAuthStateChanged((user) => {
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
          });
      } else {
        dispatch(push('/signin'));
      }
    });
  };
};

export const resetPassword = (email: string) => {
  return async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
    if (email === '') {
      alert('必須項目が未入力です');
      return;
    } else {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          alert(
            '入力されたアドレスにパスワードリセット用のメールをお送りしました。'
          );

          dispatch(push('/signin'));
        })
        .catch(() => {
          alert(
            'パスワードリセットに失敗しました。通信状況をご確認の上もう一度お試しください。'
          );
        });
    }
  };
};

export const signIn = (email: string, password: string) => {
  return async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
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
  return async (dispach: ThunkDispatch<RootState, unknown, Action>) => {
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

export const signOut = () => {
  return async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
    auth.signOut().then(() => {
      dispatch(signOutAction());

      dispatch(push('/signin'));
    });
  };
};
