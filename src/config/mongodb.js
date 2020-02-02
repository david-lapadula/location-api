// ODM and .env dependencies
const mongoose = require('mongoose');
require('dotenv').config();

const mongoDB = process.env.MONGODB_URI;
// mongo connect configuration
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
// store connection
const db = mongoose.connection;
// keep open connection
const mongodb = () => {
  db.on('error', console.error.bind(console, 'connection error with MongoDB'));
  db.once('open', () => {
    console.log('connected to MongoDB');
  });
};
module.exports = mongodb;
