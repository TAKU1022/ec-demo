import { Dispatch } from 'react';
import { CallHistoryMethodAction, push } from 'connected-react-router';
import { db, FirebaseTimestamp } from '../../firebase';

const productRef = db.collection('products');

export const saveProduct = (
  name: string,
  descripton: string,
  category: string,
  gender: string,
  price: string
) => {
  return async (dispatch: Dispatch<CallHistoryMethodAction>) => {
    const timestamp = FirebaseTimestamp.now();

    const ref = productRef.doc();
    const id = ref.id;

    const data = {
      name,
      descripton,
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
