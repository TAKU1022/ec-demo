import * as Actions from './actionsTypes';
import { initialState } from '../store/initialState';
import { ProductActionTypes, ProductsState } from './types';

export const ProductsReducer = (
  state = initialState.products,
  action: ProductActionTypes
): ProductsState => {
  switch (action.type) {
    case Actions.FETCH_PRODUCTS:
      return {
        ...state,
        list: [...action.payload],
      };
    default:
      return state;
  }
};
