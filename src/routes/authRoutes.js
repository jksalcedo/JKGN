import express from 'express';
import { 
    loginWithEmail, 
    registerWithEmail, 
    loginWithGoogle, 
    loginWithFacebook, 
    logout 
} from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginWithEmail);
router.post('/register', registerWithEmail);
router.post('/login/google', loginWithGoogle);
router.post('/login/facebook', loginWithFacebook);
router.post('/logout', logout);

router.get('/auth/login', (req, res) => {
    res.render('auth/login'); // Render the login page
});

router.get('/auth/signup', (req, res) => {
    res.render('auth/signup'); // Render the signup page
});

export default router;
