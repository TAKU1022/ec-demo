import { Action } from 'redux';
import { Product } from '../../types/Product';
import { FETCH_PRODUCTS } from './actionsTypes';

export type ProductsState = {
  list: Array<Product>;
};

export interface FetchProductsAction extends Action {
  type: typeof FETCH_PRODUCTS;
  payload: Array<Product>;
}

export type ProductActionTypes = FetchProductsAction;
