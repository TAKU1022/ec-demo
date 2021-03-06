import { push } from 'connected-react-router';
import { db, FirebaseTimestamp } from '../../firebase';
import { Product } from '../../types/Product';
import { deleteProductAction, fetchProductsAction } from './actions';
import { RootState } from '../store/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { ProductInCart } from '../../types/Cart';
import { fetchOrdersHistoryAction } from '../users/actions';
import { OrdersHistory } from '../../types/Order';

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

export const fetchProducts = (gender: string, category: string) => {
  return async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
    let query = productRef.orderBy('updatedAt', 'desc');
    query = gender !== '' ? query.where('gender', '==', gender) : query;
    query = category !== '' ? query.where('category', '==', category) : query;

    query.get().then((snapshots) => {
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

export const orderProduct = (
  productsInCart: Array<ProductInCart>,
  amount: number
) => {
  return async (
    dispatch: ThunkDispatch<RootState, unknown, Action>,
    getState: () => RootState
  ) => {
    const uid = getState().users.uid;
    const userRef = db.collection('users').doc(uid);
    const timestamp = FirebaseTimestamp.now();

    let products: any[] = [];
    let soldOutProducts: Array<string> = [];

    const batch = db.batch();

    for (const product of productsInCart) {
      const snapshot = await productRef.doc(product.productId).get();
      const sizes: Array<{ size: string; quantity: number }> =
        snapshot.data()?.sizes;

      const updatedSizes = sizes.map((size) => {
        if (size.size === product.size) {
          if (size.quantity === 0) {
            soldOutProducts.push(product.name as string);
            return size;
          }

          return {
            size: size.size,
            quantity: size.quantity - 1,
          };
        } else {
          return size;
        }
      });

      products.push({
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size,
      });

      batch.update(productRef.doc(product.productId), { sizes: updatedSizes });

      batch.delete(userRef.collection('cart').doc(product.cartId));
    }

    if (soldOutProducts.length > 0) {
      const errorMessage =
        soldOutProducts.length > 1
          ? soldOutProducts.join('???')
          : soldOutProducts[0];
      alert(
        `????????????????????????????????????${errorMessage}????????????????????????????????????????????????????????????????????????`
      );
      return;
    } else {
      batch
        .commit()
        .then(() => {
          const orderRef = userRef.collection('orders').doc();
          const date = timestamp.toDate();
          const shippingDate = FirebaseTimestamp.fromDate(
            new Date(date.setDate(date.getDate() + 3))
          );

          const history = {
            amount,
            createdAt: timestamp,
            id: orderRef.id,
            products,
            shippingDate,
            updatedAt: timestamp,
          };

          orderRef.set(history);

          dispatch(push('/order/complete'));
        })
        .catch(() => {
          alert(
            '????????????????????????????????????????????????????????????????????????????????????????????????????????????'
          );
          return;
        });
    }
  };
};

export const fetchOrdersHistory = () => {
  return async (
    dispatch: ThunkDispatch<RootState, unknown, Action>,
    getState: () => RootState
  ) => {
    const uid = getState().users.uid;
    const list: any[] = [];

    db.collection('users')
      .doc(uid)
      .collection('orders')
      .orderBy('updatedAt', 'desc')
      .get()
      .then((snapshots) => {
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push(data);
        });

        dispatch(fetchOrdersHistoryAction(list as Array<OrdersHistory>));
      });
  };
};
