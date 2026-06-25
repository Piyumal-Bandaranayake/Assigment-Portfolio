const express = require('express');
const { deleteImage } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * POST /api/upload/delete
 * Delete a Cloudinary asset by publicId.
 * Protected — requires valid JWT Bearer token.
 */
router.post('/delete', protect, deleteImage);

module.exports = router;
