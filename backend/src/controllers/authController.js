const { validationResult } = require('express-validator');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res, next) => {
  // Extract validation errors from express-validator rules (defined in routes)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    const errorMessages = errors.array().map((err) => err.msg).join(', ');
    return next(new Error(errorMessages));
  }

  const { name, email, password } = req.body;

  try {
    // Check if the email is already registered
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      return next(new Error('User already exists with this email'));
    }

    // Create the user (password hashing is done automatically in User pre-save middleware)
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      // Respond with 201 Created and return token + user details
      res.status(201).json({
        token: generateToken(user._id),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } else {
      res.status(400);
      return next(new Error('Invalid user data provided'));
    }
  } catch (error) {
    res.status(500);
    return next(error);
  }
};

/**
 * @desc    Authenticate user & get token (Login)
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res, next) => {
  // Extract validation errors from express-validator rules
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    const errorMessages = errors.array().map((err) => err.msg).join(', ');
    return next(new Error(errorMessages));
  }

  const { email, password } = req.body;

  try {
    // Fetch the user by email
    const user = await User.findOne({ email });

    // Verify user exists and the password hashes match
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        token: generateToken(user._id),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } else {
      res.status(401);
      return next(new Error('Invalid email or password'));
    }
  } catch (error) {
    res.status(500);
    return next(error);
  }
};

/**
 * @desc    Get user profile
 * @route   GET /api/auth/profile
 * @access  Private (Protected)
 */
const getUserProfile = async (req, res, next) => {
  try {
    // req.user was fetched and attached by protect middleware
    if (req.user) {
      res.status(200).json(req.user);
    } else {
      res.status(404);
      return next(new Error('User profile not found'));
    }
  } catch (error) {
    res.status(500);
    return next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
