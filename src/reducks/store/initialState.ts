import { ProductsState } from '../products/types';
import { UserState } from '../users/types';

export type State = {
  users: UserState;
  products: ProductsState;
};

export const initialState: State = {
  users: {
    isSignedIn: false,
    role: '',
    uid: '',
    username: '',
    cart: [],
    orders: [],
  },
  products: {
    list: [],
  },
};
