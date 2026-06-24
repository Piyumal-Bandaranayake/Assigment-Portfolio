const jwt = require('jsonwebtoken');

/**
 * Generate a JWT token for a given user ID.
 * @param {string} id - The user ID.
 * @returns {string} The signed JWT token.
 */
const generateToken = (id) => {
  // Ensure JWT_SECRET is loaded, fallback to a local string if not configured in environment
  const secret = process.env.JWT_SECRET || 'fallback_secret_for_local_dev';
  return jwt.sign({ id }, secret, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
