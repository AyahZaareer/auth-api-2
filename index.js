'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 6000;
const MONGODB_URI = process.env.MONGODB_URI;
const server = require('./src/server');

// Start up DB Server
const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose.connect(MONGODB_URI, options).then(() => {
  server.start(PORT);
}).catch((error) => {
  console.log('connection error', error.message);
})

// Start the web server

