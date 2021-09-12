import firebase from 'firebase';

export type OrdersHistory = {
  amount: number;
  createdAt: firebase.firestore.Timestamp;
  id: string;
  products: Array<{
    id: string;
    images: Array<{ id: string; path: string }>;
    name: string;
    price: string;
    size: string;
  }>;
  shippingDate: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
};
