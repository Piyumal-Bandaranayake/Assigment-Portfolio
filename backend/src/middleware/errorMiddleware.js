/**
 * Global error handling middleware.
 * Formats all errors thrown during requests into a unified JSON format.
 */
const errorHandler = (err, req, res, next) => {
  // If response headers are already sent, delegate to Express's built-in error handler
  if (res.headersSent) {
    return next(err);
  }

  // Determine the response status code. If it is 200 or 201, default to 500 (Internal Server Error)
  const statusCode = res.statusCode && res.statusCode !== 200 && res.statusCode !== 201
    ? res.statusCode
    : 500;

  // Log error stack to console if in development mode for easier debugging
  if (process.env.NODE_ENV === 'development') {
    console.error(`[Error Handler] ${err.message}`, err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

module.exports = { errorHandler };
