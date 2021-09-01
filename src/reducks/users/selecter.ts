import { createSelector } from 'reselect';
import { RootState } from '../store/store';

const usersSelecter = (state: RootState) => state.users;

export const getIsSignedIn = createSelector(
  [usersSelecter],
  (state) => state.isSignedIn
);

export const getUserId = createSelector([usersSelecter], (state) => state.uid);

export const getUsername = createSelector(
  [usersSelecter],
  (state) => state.username
);
