import { auth, googleProvider, facebookProvider } from '../config/firebase.js';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from 'firebase/auth';

export const loginWithEmail = async (req, res) => {
    const { email, password } = req.body;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        res.redirect('/home'); // Redirect to homepage on success
        console.log('User  signed in successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const registerWithEmail = async (req, res) => {
    const { email, password } = req.body;
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        res.redirect('/home'); // Redirect to homepage on success
        console.log('User  signed in successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const loginWithGoogle = async (req, res) => {
    try {
        await signInWithPopup(auth, googleProvider);
        res.redirect('/home'); // Redirect to homepage on success
        console.log('User  signed in successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const loginWithFacebook = async (req, res) => {
    try {
        await signInWithPopup(auth, facebookProvider);
        res.redirect('/home'); // Redirect to homepage on success
        console.log('User  signed in successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const logout = async (req, res) => {
    try {
      await signOut(auth);
      res.redirect('/');
    } catch (error) {
      res.status(500).send('Logout failed');
    }
  };

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User  is signed in:', user);
    } else {
        console.log('No user is signed in.');
    }
});