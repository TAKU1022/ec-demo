import firebase from 'firebase';

export type Product = {
  name: string;
  description: string;
  category: string;
  gender: string;
  price: number;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
  id: string;
};
