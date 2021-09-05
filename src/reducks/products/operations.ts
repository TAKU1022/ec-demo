import { push } from 'connected-react-router';
import { db, FirebaseTimestamp } from '../../firebase';
import { Product } from '../../types/Product';
import { deleteProductAction, fetchProductsAction } from './actions';
import { RootState } from '../store/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

const productRef = db.collection('products');

export const saveProduct = (
  id: string,
  images: Array<{ id: string; path: string }>,
  name: string,
  description: string,
  category: string,
  gender: string,
  price: string,
  sizes: Array<{ size: string; quantity: number }>
) => {
  return async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
    const timestamp = FirebaseTimestamp.now();

    let data: Product | Omit<Product, 'id' | 'createdAt'> = {
      images,
      name,
      description,
      category,
      gender,
      price: parseInt(price, 10),
      sizes,
      updatedAt: timestamp,
    };

    if (id === '') {
      const ref = productRef.doc();
      id = ref.id;
      const newData: Product = {
        ...data,
        id,
        createdAt: timestamp,
      };
      data = newData;
    }

    return productRef
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        dispatch(push('/'));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export const fetchProducts = () => {
  return async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
    productRef
      .orderBy('updatedAt', 'desc')
      .get()
      .then((snapshots) => {
        const productList: any[] = [];

        snapshots.forEach((snapshot) => {
          const product = snapshot.data();
          productList.push(product);
        });

        const products: Product[] = [...productList];

        dispatch(fetchProductsAction(products));
      });
  };
};

export const deleteProduct = (id: string) => {
  return async (
    dispatch: ThunkDispatch<RootState, unknown, Action>,
    getState: () => RootState
  ) => {
    productRef
      .doc(id)
      .delete()
      .then(() => {
        const prevProducts = getState().products.list;
        const nextProducts = prevProducts.filter(
          (product) => product.id !== id
        );

        dispatch(deleteProductAction(nextProducts));
      });
  };
};
