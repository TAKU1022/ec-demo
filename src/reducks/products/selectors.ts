import { createSelector } from 'reselect';
import { RootState } from '../store/store';

const productsSelecter = (state: RootState) => state.products;

export const getProductList = createSelector(
  [productsSelecter],
  (state) => state.list
);
