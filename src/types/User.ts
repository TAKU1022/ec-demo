import firebase from 'firebase';

export type UserData = {
  createdAt: firebase.firestore.Timestamp;
  email: string;
  role: string;
  uid: string;
  updatedAt: firebase.firestore.Timestamp;
  username: string;
};
