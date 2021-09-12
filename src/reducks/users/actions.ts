import { ProductInCart } from '../../types/Cart';
import { OrdersHistory } from '../../types/Order';
import {
  FETCH_ORDERS_HISTORY,
  FETCH_PRODUCTS_IN_CART,
  SIGN_IN,
  SIGN_OUT,
} from './actionTypes';
import {
  FetchOrdersHistoryAction,
  FetchProductsInCartAction,
  SignInAction,
  SignOutAction,
  UserState,
} from './types';

export const signInAction = (
  userState: Omit<UserState, 'cart' | 'orders'>
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

export const fetchProductsInCartAction = (
  products: Array<ProductInCart>
): FetchProductsInCartAction => {
  return {
    type: FETCH_PRODUCTS_IN_CART,
    payload: products,
  };
};

export const fetchOrdersHistoryAction = (
  history: Array<OrdersHistory>
): FetchOrdersHistoryAction => {
  return {
    type: FETCH_ORDERS_HISTORY,
    payload: history,
  };
};
