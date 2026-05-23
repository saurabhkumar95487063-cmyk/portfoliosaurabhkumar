const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;
console.log('Testing connection to MongoDB Atlas...');

mongoose.connect(mongoURI)
  .then(() => {
    console.log('SUCCESS: Successfully connected to MongoDB Atlas! Network whitelist and credentials are correct.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('ERROR: Failed to connect to MongoDB Atlas!');
    console.error(err.message);
    process.exit(1);
  });
