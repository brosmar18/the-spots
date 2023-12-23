'use strict';
const express = require('express');
const mongoose = require('mongoose');
const notFound = require('./handlers/404');
const errorHandler = require('./handlers/500');
const logger = require('./utils/logger'); 

require('dotenv').config();
const PORT = process.env.PORT || 5002;

const app = express();

// Test route
app.get('/test', (req, res) => {
  res.status(200).send('Test route works!');
});

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.get('/error', (req, res, next) => {
  throw new Error('Forced Error for Testing');
});

app.use('*', notFound);
app.use(errorHandler);

const start = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      app.listen(PORT, () => logger.info(`Server running on PORT: ${PORT}`));
      logger.info('Connected to MongoDB successfully');
    })
    .catch((error) => {
      logger.error(`Database connection failed: ${error.message}`);
    });
};

module.exports = { app, start };
