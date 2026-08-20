const dns = require('dns');
const mongoose = require('mongoose');
const env = require('./env');

// Use reliable DNS servers for MongoDB SRV lookup
dns.setServers(['8.8.8.8', '1.1.1.1']);

async function connectDB() {
  try {
    await mongoose.connect(env.mongodbUri);

    console.log(`[db] MongoDB connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error('[db] Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;