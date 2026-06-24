const dns = require('dns');
const mongoose = require('mongoose');

// If the DNS is misconfigured (e.g. only pointing to 127.0.0.1 which is common on some dev setups),
// fall back to public DNS resolvers so MongoDB Atlas SRV resolution works.
const currentServers = dns.getServers();
if (currentServers.length === 0 || (currentServers.length === 1 && currentServers[0] === '127.0.0.1')) {
  try {
    dns.setServers(['1.1.1.1', '8.8.8.8']);
  } catch (err) {
    console.warn('Warning: Could not set fallback DNS servers:', err.message);
  }
}

const uri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

/**
 * Connect to the MongoDB database using Mongoose.
 * @returns {Promise<import('mongoose').Connection>} The mongoose connection.
 */
async function connectDB() {
  try {
    const maskedUri = uri.replace(/:([^:@]+)@/, ':******@');
    console.log(`Connecting to MongoDB using Mongoose at: ${maskedUri}...`);
    
    const conn = await mongoose.connect(uri);

    console.log(`MongoDB connected successfully via Mongoose: ${conn.connection.host}`);
    return conn.connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB using Mongoose:', error.message);
    process.exit(1);
  }
}

/**
 * Close the database connection gracefully.
 * @returns {Promise<void>}
 */
async function closeDB() {
  try {
    await mongoose.connection.close();
    console.log('Mongoose connection closed.');
  } catch (error) {
    console.error('Error closing Mongoose connection:', error.message);
  }
}

module.exports = {
  connectDB,
  closeDB
};
