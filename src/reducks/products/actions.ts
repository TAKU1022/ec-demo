import { Product } from '../../types/Product';
import { FETCH_PRODUCTS } from './actionsTypes';
import { FetchProductsAction } from './types';

export const fetchProductsAction = (
  products: Array<Product>
): FetchProductsAction => {
  return {
    type: FETCH_PRODUCTS,
    payload: products,
  };
};
