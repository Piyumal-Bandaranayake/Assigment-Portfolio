require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, closeDB } = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');

// Import error handler middleware
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    timestamp: new Date(),
    env: process.env.NODE_ENV
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Global Error Handler (must be defined after other routes/middlewares)
app.use(errorHandler);

// Start server and connect to Database
async function startServer() {
  try {
    // Connect to database before starting the server
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
}

// Graceful shutdown handling
const handleGracefulShutdown = async (signal) => {
  console.log(`\nReceived ${signal}. Starting graceful shutdown...`);
  try {
    await closeDB();
    console.log('Database connections closed cleanly.');
    process.exit(0);
  } catch (err) {
    console.error('Error during graceful shutdown:', err);
    process.exit(1);
  }
};

process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));
process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));

startServer();
