'use strict';
const express = require('express');
const notFound = require('./handlers/404');
const errorHandler = require('./handlers/500');


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
  app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
};

module.exports = { app, start };
