import { Product } from '../../types/Product';
import { DELETE_PRODUCT, FETCH_PRODUCTS } from './actionTypes';
import { DeleteProductAction, FetchProductsAction } from './types';

export const fetchProductsAction = (
  products: Array<Product>
): FetchProductsAction => {
  return {
    type: FETCH_PRODUCTS,
    payload: products,
  };
};

export const deleteProductAction = (
  products: Array<Product>
): DeleteProductAction => {
  return {
    type: DELETE_PRODUCT,
    payload: products,
  };
};
