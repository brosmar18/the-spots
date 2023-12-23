'use strict';

const request = require('supertest');
const { app } = require('../../src/server');
const logger = require('../../src/utils/logger'); // Import the Winston logger

describe('404 Error Handler', () => {
  test('It should respond with a 404 status', async () => {
    const response = await request(app).get('/does-not-exist');
    expect(response.statusCode).toBe(404);
  });

  test('It should return a JSON object with the error details', async () => {
    const response = await request(app).get('/does-not-exist');
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual({
      status: 'error',
      statusCode: 404,
      message: 'The requested source was not found on this server.',
      route: '/does-not-exist',
    });
  });

  test('It should log the error', () => {
    // Spy on logger.error to assert it is called
    const spy = jest.spyOn(logger, 'error');
    spy.mockImplementation(() => {});

    const req = { method: 'GET', originalUrl: '/does-not-exist' };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    
    // Import the notFound handler directly
    const notFoundHandler = require('../../src/handlers/404');

    // Execute the handler
    notFoundHandler(req, res);

    // Assert that logger.error was called
    expect(spy).toHaveBeenCalledWith(
      `[404] Resource not found: ${req.method} ${req.originalUrl}`
    );

    // Restore the original implementation
    spy.mockRestore();
  });
});
