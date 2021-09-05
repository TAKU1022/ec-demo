import firebase from 'firebase';

export type Product = {
  images: Array<{ id: string; path: string }>;
  name: string;
  description: string;
  category: string;
  gender: string;
  price: number;
  sizes: Array<{ size: string; quantity: number }>;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
  id: string;
};
