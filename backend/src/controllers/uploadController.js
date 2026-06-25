const { deleteFromCloudinary } = require('../config/cloudinary');

/**
 * @desc    Delete a Cloudinary image by its publicId
 * @route   POST /api/upload/delete
 * @access  Private (JWT required)
 *
 * Body: { publicId: "portfolio/abc123" }
 */
const deleteImage = async (req, res, next) => {
  const { publicId } = req.body;

  if (!publicId || typeof publicId !== 'string') {
    res.status(400);
    return next(new Error('publicId is required and must be a string'));
  }

  try {
    const result = await deleteFromCloudinary(publicId);

    if (result && result.result === 'ok') {
      return res.status(200).json({
        success: true,
        message: 'Image deleted from Cloudinary successfully',
        publicId,
      });
    }

    // Cloudinary returns 'not found' when publicId does not exist
    if (result && result.result === 'not found') {
      return res.status(404).json({
        success: false,
        message: 'Image not found in Cloudinary — it may have already been deleted',
        publicId,
      });
    }

    // Unexpected result
    res.status(500);
    return next(new Error('Unexpected response from Cloudinary'));
  } catch (error) {
    res.status(500);
    return next(error);
  }
};

module.exports = { deleteImage };
