import express from 'express';
import {
  registerUser,
  loginUser,
  googleLogin,
  logout
} from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleLogin);
router.post('/logout', authenticateToken, logout);

// Protected route example
router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'Access granted',
    user: req.user
  });
});



router.get("/auth/login", (req, res) => {
  res.render("auth"); // Render the login page
});

router.get("/auth/signup", (req, res) => {
  res.render("auth"); // Render the signup page
});

export default router;