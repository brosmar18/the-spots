'use strict';

const request = require('supertest');
const { app } = require('../../src/server');
const logger = require('../../src/utils/logger');

describe('500 Error Handler', () => {
  // Mock logger.error to test logging
  beforeEach(() => {
    jest.spyOn(logger, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Test to ensure that the 500 error handler responds with the correct status and message
  test('It should respond with a 500 status and error message', async () => {
    const response = await request(app).get('/error');
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      status: 'error',
      statusCode: 500,
      message: 'Internal Server Error',
      route: '/error',
      query: {},
    });
  });

  // Test to ensure that the error is logged correctly
  test('It should log the error', async () => {
    await request(app).get('/error');

    // Assert that logger.error was called with the expected message and details
    expect(logger.error).toHaveBeenCalledWith(
      `[500] Internal Server Error at /error:`,
      expect.objectContaining({
        error: 'Forced Error for Testing',
        method: 'GET',
        headers: expect.any(Object),
        query: {},
        // 'body' is undefined in the actual log, not an empty object
        body: undefined,
        // Added stack trace expectation
        stack: expect.any(String),
      }),
    );
  });
});
