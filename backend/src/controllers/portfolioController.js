const Portfolio = require('../models/Portfolio');
const {
  deleteFromCloudinary,
  deleteManyFromCloudinary,
} = require('../config/cloudinary');

/**
 * Collect all Cloudinary publicIds from a portfolio document.
 * Returns a flat array of non-empty strings.
 */
const collectPublicIds = (portfolio) => {
  const ids = [];
  if (portfolio.profileImage?.publicId) ids.push(portfolio.profileImage.publicId);
  (portfolio.projects || []).forEach((p) => {
    if (p.image?.publicId) ids.push(p.image.publicId);
  });
  return ids;
};

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

    // Prevent duplicate username
    const usernameExists = await Portfolio.findOne({ username: cleanUsername });
    if (usernameExists) {
      res.status(400);
      return next(new Error('Username is already taken'));
    }

    // Prevent duplicate portfolio per user (1 portfolio per account)
    const userPortfolioExists = await Portfolio.findOne({ user: req.user._id });
    if (userPortfolioExists) {
      res.status(400);
      return next(
        new Error('You already have a portfolio. Please update it instead.')
      );
    }

    // profileImage arrives as { publicId, url } from the frontend
    const portfolio = await Portfolio.create({
      user: req.user._id,
      username: cleanUsername,
      fullName,
      title,
      bio,
      profileImage: profileImage || { publicId: '', url: '' },
      contact,
      skills,
      projects: (projects || []).map((p) => ({
        ...p,
        image: p.image || { publicId: '', url: '' },
      })),
      experience,
    });

    res.status(201).json(portfolio);
  } catch (error) {
    res.status(400);
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
    const portfolio = await Portfolio.findOne({ username: cleanUsername }).populate(
      'user',
      'name email username'
    );

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
    const portfolio = await Portfolio.findOne({ username: cleanUsername });

    if (!portfolio) {
      res.status(404);
      return next(new Error('Portfolio not found'));
    }

    // Verify ownership
    if (portfolio.user.toString() !== req.user._id.toString()) {
      res.status(403);
      return next(new Error('Not authorized to update this portfolio'));
    }

    // Username uniqueness check if changing username
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

    // If profile image is being replaced, delete the old Cloudinary asset
    if (
      req.body.profileImage &&
      req.body.profileImage.publicId !== portfolio.profileImage?.publicId &&
      portfolio.profileImage?.publicId
    ) {
      await deleteFromCloudinary(portfolio.profileImage.publicId);
    }

    // If individual project images are being replaced, delete old assets
    if (req.body.projects && Array.isArray(req.body.projects)) {
      const oldProjects = portfolio.projects || [];
      req.body.projects.forEach((newProject, i) => {
        const oldProject = oldProjects[i];
        if (
          oldProject?.image?.publicId &&
          newProject?.image?.publicId !== oldProject.image.publicId
        ) {
          deleteFromCloudinary(oldProject.image.publicId).catch(() => {});
        }
      });
    }

    // Apply all updated fields
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
    res.status(400);
    return next(error);
  }
};

/**
 * @desc    Delete portfolio (also removes all associated Cloudinary images)
 * @route   DELETE /api/portfolio/:username
 * @access  Private
 */
const deletePortfolio = async (req, res, next) => {
  try {
    const cleanUsername = req.params.username.trim().toLowerCase();
    const portfolio = await Portfolio.findOne({ username: cleanUsername });

    if (!portfolio) {
      res.status(404);
      return next(new Error('Portfolio not found'));
    }

    // Verify ownership
    if (portfolio.user.toString() !== req.user._id.toString()) {
      res.status(403);
      return next(new Error('Not authorized to delete this portfolio'));
    }

    // Delete all Cloudinary images associated with this portfolio
    const publicIds = collectPublicIds(portfolio);
    if (publicIds.length > 0) {
      await deleteManyFromCloudinary(publicIds);
    }

    await portfolio.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Portfolio and all associated images deleted successfully',
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
