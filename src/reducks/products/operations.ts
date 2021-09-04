import { Dispatch } from 'react';
import { CallHistoryMethodAction, push } from 'connected-react-router';
import { db, FirebaseTimestamp } from '../../firebase';
import { Product } from '../../types/Product';

const productRef = db.collection('products');

export const saveProduct = (
  images: { id: string; path: string }[],
  name: string,
  description: string,
  category: string,
  gender: string,
  price: string
) => {
  return async (dispatch: Dispatch<CallHistoryMethodAction>) => {
    const timestamp = FirebaseTimestamp.now();

    const ref = productRef.doc();
    const id = ref.id;

    const data: Product = {
      images,
      name,
      description,
      category,
      gender,
      price: parseInt(price, 10),
      createdAt: timestamp,
      updatedAt: timestamp,
      id,
    };

    return productRef
      .doc(id)
      .set(data)
      .then(() => {
        dispatch(push('/'));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
