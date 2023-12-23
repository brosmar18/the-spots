'use strict';

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 5002;

const app = express();

app.use('/', (req, res) => {
  res.status(200).send('Hello World!');
});

const start = () => {
  app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
};

export { app, start };
