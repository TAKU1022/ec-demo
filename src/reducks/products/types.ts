import { Action } from 'redux';
import { Product } from '../../types/Product';
import { DELETE_PRODUCT, FETCH_PRODUCTS } from './actionTypes';

export type ProductsState = {
  list: Array<Product>;
};

export interface FetchProductsAction extends Action {
  type: typeof FETCH_PRODUCTS;
  payload: Array<Product>;
}

export interface DeleteProductAction extends Action {
  type: typeof DELETE_PRODUCT;
  payload: Array<Product>;
}

export type ProductActionTypes = FetchProductsAction | DeleteProductAction;
