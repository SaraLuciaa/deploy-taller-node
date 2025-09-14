import { errorHandler, AppError, createError } from '../../middlewares/error.handler';
import { Request, Response } from 'express';

describe('errorHandler middleware', () => {
  let req: Partial<Request>;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = { url: '/test', method: 'GET' };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should handle operational errors (AppError)', () => {
    const error = new AppError('Custom error', 400);
    errorHandler(error, req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Custom error' });
    expect(next).not.toHaveBeenCalled();
  });
  it('should respond with custom status and message for AppError', () => {
    const error = new AppError('Custom operational error', 418);
    errorHandler(error, req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(418);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Custom operational error' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should default to status 500 if AppError has no statusCode', () => {
    const error = new AppError('No status code error');
    error.statusCode = undefined;
    errorHandler(error, req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'No status code error' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle non-operational errors', () => {
    const error = new Error('Generic error') as any;
    errorHandler(error, req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Error interno del servidor',
      error: expect.any(String)
    });
  });

  it('should use createError helper', () => {
    const error = createError('Helper error', 401);
    expect(error).toBeInstanceOf(AppError);
    expect(error.message).toBe('Helper error');
    expect(error.statusCode).toBe(401);
    expect(error.isOperational).toBe(true);
  });

  it('should show error message in dev environment', () => {
    process.env.NODE_ENV = 'dev';
    const error = new Error('Generic error') as any;
    errorHandler(error, req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Error interno del servidor',
      error: 'Generic error'
    });
  });

  it('should show generic error in production', () => {
    process.env.NODE_ENV = 'production';
    const error = new Error('Generic error') as any;
    errorHandler(error, req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Error interno del servidor',
      error: 'Algo salió mal'
    });
  });
});