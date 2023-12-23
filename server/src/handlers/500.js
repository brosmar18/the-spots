'use strict';

const logger = require('../utils/logger'); 

module.exports = (err, req, res, next) => {
  // Log the error 
  logger.error(`[500] Internal Server Error at ${req.path}:`, {
    error: err.message,
    stack: err.stack, 
    query: req.query,
    body: req.body,
    method: req.method,
    headers: req.headers,
  });

  // Respond with a structured error message
  res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: 'Internal Server Error',
    route: req.path,
    query: req.query,
    body: req.body,
  });
};
