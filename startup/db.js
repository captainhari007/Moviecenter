// Use environment variable for connection string
require('dotenv').config();
const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
    // console.log(process.env.IS_TEST_ENV);
    const connectionString =
        process.env.IS_TEST_ENV === 'true' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI || 'mongodb://localhost:27017/vidly';

mongoose.connect(connectionString)
  .then(() => winston.info(`Connected to MongoDB at ${connectionString}...`))
  .catch(err => console.error('Could not connect to MongoDB...', err));

};
