const express = require('express');
const { check } = require('express-validator');
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Input validation rules for registration
const registerValidation = [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email address').isEmail().normalizeEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
];

// Input validation rules for login
const loginValidation = [
  check('email', 'Please include a valid email address').isEmail().normalizeEmail(),
  check('password', 'Password is required').notEmpty(),
];

// Auth routes configuration
router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
