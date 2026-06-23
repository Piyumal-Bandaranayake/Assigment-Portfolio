const dns = require('dns');
const { MongoClient } = require('mongodb');

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

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

let client = null;
let db = null;

/**
 * Connect to the MongoDB database.
 * @returns {Promise<import('mongodb').Db>} The database instance.
 */
async function connectDB() {
  if (db) {
    return db;
  }

  try {
    const maskedUri = uri.replace(/:([^:@]+)@/, ':******@');
    console.log(`Connecting to MongoDB at: ${maskedUri}...`);
    client = new MongoClient(uri);

    await client.connect();
    db = client.db();

    console.log(`MongoDB connected successfully to database`);
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}

/**
 * Get the active database instance.
 * Throws an error if connectDB has not been called first.
 * @returns {import('mongodb').Db} The database instance.
 */
function getDB() {
  if (!db) {
    throw new Error('Database has not been initialized. Please call connectDB first.');
  }
  return db;
}

/**
 * Close the database connection gracefully.
 * @returns {Promise<void>}
 */
async function closeDB() {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed.');
    db = null;
    client = null;
  }
}

module.exports = {
  connectDB,
  getDB,
  closeDB
};
