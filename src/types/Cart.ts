import firebase from 'firebase';

export type ProductsInCart = {
  addedAt: firebase.firestore.Timestamp;
  description: string | undefined;
  gender: string | undefined;
  images: Array<{ id: string; path: string }> | undefined;
  name: string | undefined;
  price: number | undefined;
  productId: string | undefined;
  quantity: number | undefined;
  size: string;
  cartId: string;
};
