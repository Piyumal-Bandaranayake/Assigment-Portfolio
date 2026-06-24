const express = require('express');
const {
  createPortfolio,
  getPortfolioByUsername,
  updatePortfolio,
  deletePortfolio,
} = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route: /api/portfolio
router.post('/', protect, createPortfolio);

// Routes: /api/portfolio/:username
router.get('/:username', getPortfolioByUsername);
router.put('/:username', protect, updatePortfolio);
router.delete('/:username', protect, deletePortfolio);

module.exports = router;
