import { Dispatch } from 'react';
import { CallHistoryMethodAction, push } from 'connected-react-router';
import { db, FirebaseTimestamp } from '../../firebase';
import { Product } from '../../types/Product';

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
  return async (dispatch: Dispatch<CallHistoryMethodAction>) => {
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
