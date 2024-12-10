import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider, admin } from '../config/firebase.js';
import { generateToken } from '../middleware/authMiddleware.js';

export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const token = generateToken(userCredential.user);

        res.status(201).json({
            token,
            user: {
                uid: userCredential.user.uid,
                email: userCredential.user.email
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = generateToken(userCredential.user);

        res.json({
            token,
            user: {
                uid: userCredential.user.uid,
                email: userCredential.user.email
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const googleLogin = async (req, res) => {
    try {
        const userCredential = await signInWithPopup(auth, googleProvider);
        const token = generateToken(userCredential.user);

        res.json({
            token,
            user: {
                uid: userCredential.user.uid,
                email: userCredential.user.email
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        await admin.auth().revokeRefreshTokens(req.user.uid);
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Logout failed' });
    }
};