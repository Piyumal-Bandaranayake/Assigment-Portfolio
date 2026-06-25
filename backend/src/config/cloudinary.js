const cloudinary = require('cloudinary').v2;

/**
 * Configure Cloudinary with credentials from environment variables.
 * Called once at server startup.
 */
const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    console.warn(
      '⚠️  Cloudinary credentials missing in .env — image delete operations will fail.'
    );
  } else {
    console.log('✅ Cloudinary configured successfully.');
  }
};

/**
 * Delete a single asset from Cloudinary by its public_id.
 * Returns the Cloudinary API result object.
 */
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return null;
  return await cloudinary.uploader.destroy(publicId);
};

/**
 * Delete multiple assets from Cloudinary.
 * Accepts an array of publicId strings. Silently skips empty/null values.
 */
const deleteManyFromCloudinary = async (publicIds = []) => {
  const valid = publicIds.filter(Boolean);
  if (!valid.length) return [];
  return Promise.allSettled(valid.map((id) => cloudinary.uploader.destroy(id)));
};

module.exports = { configureCloudinary, deleteFromCloudinary, deleteManyFromCloudinary };
