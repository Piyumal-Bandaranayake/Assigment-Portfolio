const Portfolio = require('../models/Portfolio');

/**
 * @desc    Create a portfolio
 * @route   POST /api/portfolio
 * @access  Private
 */
const createPortfolio = async (req, res, next) => {
  const {
    username,
    fullName,
    title,
    bio,
    profileImage,
    contact,
    skills,
    projects,
    experience,
  } = req.body;

  try {
    if (!username) {
      res.status(400);
      return next(new Error('Username is required'));
    }

    const cleanUsername = username.trim().toLowerCase();

    // 1. Prevent duplicate username
    const usernameExists = await Portfolio.findOne({ username: cleanUsername });
    if (usernameExists) {
      res.status(400);
      return next(new Error('Username is already taken'));
    }

    // 2. Prevent duplicate portfolio per user (Standard practice: 1 portfolio per user account)
    const userPortfolioExists = await Portfolio.findOne({ user: req.user._id });
    if (userPortfolioExists) {
      res.status(400);
      return next(new Error('You already have a portfolio. Please update it instead.'));
    }

    // 3. Create the portfolio associated with the logged-in user
    const portfolio = await Portfolio.create({
      user: req.user._id,
      username: cleanUsername,
      fullName,
      title,
      bio,
      profileImage,
      contact,
      skills,
      projects,
      experience,
    });

    res.status(201).json(portfolio);
  } catch (error) {
    res.status(400); // Mongoose validation error
    return next(error);
  }
};

/**
 * @desc    Get portfolio by username
 * @route   GET /api/portfolio/:username
 * @access  Public
 */
const getPortfolioByUsername = async (req, res, next) => {
  try {
    const cleanUsername = req.params.username.trim().toLowerCase();

    // Find the portfolio and populate owner details (name, email)
    const portfolio = await Portfolio.findOne({ username: cleanUsername })
      .populate('user', 'name email');

    if (!portfolio) {
      res.status(404);
      return next(new Error('Portfolio not found'));
    }

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500);
    return next(error);
  }
};

/**
 * @desc    Update portfolio
 * @route   PUT /api/portfolio/:username
 * @access  Private
 */
const updatePortfolio = async (req, res, next) => {
  try {
    const cleanUsername = req.params.username.trim().toLowerCase();

    // Find the portfolio first to check owner permissions
    const portfolio = await Portfolio.findOne({ username: cleanUsername });

    if (!portfolio) {
      res.status(404);
      return next(new Error('Portfolio not found'));
    }

    // Verify ownership: Only the portfolio owner can update
    if (portfolio.user.toString() !== req.user._id.toString()) {
      res.status(403);
      return next(new Error('Not authorized to update this portfolio'));
    }

    // If username is being changed, check if new username is unique
    if (req.body.username) {
      const newUsername = req.body.username.trim().toLowerCase();
      if (newUsername !== portfolio.username) {
        const usernameExists = await Portfolio.findOne({ username: newUsername });
        if (usernameExists) {
          res.status(400);
          return next(new Error('New username is already taken'));
        }
        portfolio.username = newUsername;
      }
    }

    // Update other fields if provided in request body
    const fieldsToUpdate = [
      'fullName',
      'title',
      'bio',
      'profileImage',
      'contact',
      'skills',
      'projects',
      'experience',
    ];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        portfolio[field] = req.body[field];
      }
    });

    const updatedPortfolio = await portfolio.save();
    res.status(200).json(updatedPortfolio);
  } catch (error) {
    res.status(400); // Mongoose validation error
    return next(error);
  }
};

/**
 * @desc    Delete portfolio
 * @route   DELETE /api/portfolio/:username
 * @access  Private
 */
const deletePortfolio = async (req, res, next) => {
  try {
    const cleanUsername = req.params.username.trim().toLowerCase();

    // Find the portfolio to check permissions
    const portfolio = await Portfolio.findOne({ username: cleanUsername });

    if (!portfolio) {
      res.status(404);
      return next(new Error('Portfolio not found'));
    }

    // Verify ownership: Only the portfolio owner can delete
    if (portfolio.user.toString() !== req.user._id.toString()) {
      res.status(403);
      return next(new Error('Not authorized to delete this portfolio'));
    }

    // Use deleteOne to trigger any mongoose hooks/middleware if needed
    await portfolio.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Portfolio deleted successfully',
    });
  } catch (error) {
    res.status(500);
    return next(error);
  }
};

module.exports = {
  createPortfolio,
  getPortfolioByUsername,
  updatePortfolio,
  deletePortfolio,
};
