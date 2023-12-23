'use strict';

const logger = require('../utils/logger'); 

module.exports = (req, res, next) => {
  const errorInfo = {
    status: 'error',
    statusCode: 404,
    message: 'The requested source was not found on this server.',
    route: req.originalUrl,
  };


  logger.error(`[404] Resource not found: ${req.method} ${req.originalUrl}`);

  res.status(404).json(errorInfo);
};
