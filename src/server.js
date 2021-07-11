'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404');
const authRoutes = require('./auth/router/routes');
const logger = require('./auth/middleware/logger');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

const v1router = require('./auth/router/v1');
const v2router = require('./auth/router/v2');
app.use(authRoutes);
app.use(logger);

app.use('/api/v1', v1router);
app.use('/api/v2', v2router);

app.get('/', (req, res) => {
  res.send('Hello from Home');
})

// Catchalls

app.use('*', notFound);
app.use(errorHandler);


module.exports = {
  server: app,
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log(`Server Up on ${PORT}`);
    });
  },
};
