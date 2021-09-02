import { initialState } from '../store/initialState';
import * as ActionTypes from './actionTypes';
import { UserActionTypes, UserState } from './types';

export const UsersReducer = (
  state = initialState.users,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.SIGN_OUT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
