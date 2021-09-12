import firebase from 'firebase';

export type OrdersHistory = {
  amout: number;
  createdAt: firebase.firestore.Timestamp;
  id: string;
  products: Array<{
    id: string;
    image: Array<{ id: string; path: string }>;
    name: string;
    price: string;
    size: string;
  }>;
  shippingDate: firebase.firestore.Timestamp;
  updatedUt: firebase.firestore.Timestamp;
};
