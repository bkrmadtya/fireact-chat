import firebase from 'firebase';

import { firebaseConfig } from './environment';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const db = firebase.database();
