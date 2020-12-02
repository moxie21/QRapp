import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import firebaseConfig from './config';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

const loginWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

const registerWithEmail = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

const logout = () => auth.signOut();

const passwordReset = email => auth.sendPasswordResetEmail(email);

export { firebase, auth, loginWithEmail, registerWithEmail, logout, passwordReset };


