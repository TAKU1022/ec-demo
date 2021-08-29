import { UserState } from '../users/types';

export type State = {
  users: UserState;
};

export const initialState: State = {
  users: {
    icon: '',
    isSignedIn: false,
    uid: '',
    username: '',
  },
};
