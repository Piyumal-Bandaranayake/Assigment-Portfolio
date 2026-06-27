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

  const { username, name, email, password } = req.body;

  try {
    // Check username uniqueness separately for a clear error message
    const usernameTaken = await User.findOne({ username: username.toLowerCase() });
    if (usernameTaken) {
      res.status(400);
      return next(new Error('Username is already taken. Please choose another.'));
    }

    // Check if the email is already registered
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      res.status(400);
      return next(new Error('An account with this email already exists.'));
    }

    // Create the user (password hashing done automatically in User pre-save middleware)
    const user = await User.create({
      username,
      name,
      email,
      password,
      // role defaults to 'user' via schema
    });

    if (user) {
      // Respond with 201 Created — return token + user details (no password)
      res.status(201).json({
        token: generateToken(user._id),
        user: {
          _id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
          role: user.role,
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

  const { username, password } = req.body;

  try {
    // Fetch the user by username — explicitly select password (it's hidden by default via select:false)
    const user = await User.findOne({ username: username.toLowerCase() }).select('+password');

    // Verify user exists and the password hashes match
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        token: generateToken(user._id),
        user: {
          _id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
      });
    } else {
      res.status(401);
      return next(new Error('Invalid username or password'));
    }
  } catch (error) {
    res.status(500);
    return next(error);
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/profile
 * @access  Private (Protected)
 */
const getUserProfile = async (req, res, next) => {
  try {
    // req.user is attached by the protect middleware (no password field)
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
