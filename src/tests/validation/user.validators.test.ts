
let validationResultMock: any;
jest.mock('express-validator', () => {
  const actual = jest.requireActual('express-validator');
  validationResultMock = jest.fn();
  return {
    ...actual,
    validationResult: (...args: any[]) => validationResultMock(...args)
  };
});
import { validationResult } from 'express-validator';
import { userValidations } from '../../validation/user.validators';
import { handleValidationErrors } from '../../middlewares/handle.validations.error';

describe('userValidations', () => {
  it('should contain create, update, and id arrays', () => {
    expect(Array.isArray(userValidations.create)).toBe(true);
    expect(Array.isArray(userValidations.update)).toBe(true);
    expect(Array.isArray(userValidations.id)).toBe(true);
  });

  it('should include handleValidationErrors as last middleware in create', () => {
    expect(userValidations.create[userValidations.create.length - 1]).toBe(handleValidationErrors);
  });

  it('should include handleValidationErrors as last middleware in update', () => {
    expect(userValidations.update[userValidations.update.length - 1]).toBe(handleValidationErrors);
  });

  it('should include handleValidationErrors as last middleware in id', () => {
    expect(userValidations.id[userValidations.id.length - 1]).toBe(handleValidationErrors);
  });

  it('should validate name in create', () => {
    const req: any = { body: { name: 'A', email: 'test@test.com', password: 'Password1' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    validationResultMock.mockReturnValue({
      isEmpty: () => false,
      array: () => [{ type: 'field', path: 'name', msg: 'Name must be between 2 and 50 characters', value: 'A' }]
    });
    const handleValidation = userValidations.create[userValidations.create.length - 1];
    handleValidation(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Validation errors',
      errors: [{ field: 'name', message: 'Name must be between 2 and 50 characters', value: 'A' }]
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should validate email in create', () => {
    const req: any = { body: { name: 'Valid Name', email: 'bademail', password: 'Password1' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    validationResultMock.mockReturnValue({
      isEmpty: () => false,
      array: () => [{ type: 'field', path: 'email', msg: 'Please provide a valid email address', value: 'bademail' }]
    });
    const handleValidation = userValidations.create[userValidations.create.length - 1];
    handleValidation(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Validation errors',
      errors: [{ field: 'email', message: 'Please provide a valid email address', value: 'bademail' }]
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should validate password in create', () => {
    const req: any = { body: { name: 'Valid Name', email: 'test@test.com', password: '123' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    validationResultMock.mockReturnValue({
      isEmpty: () => false,
      array: () => [{ type: 'field', path: 'password', msg: 'Password must be at least 6 characters long', value: '123' }]
    });
    const handleValidation = userValidations.create[userValidations.create.length - 1];
    handleValidation(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Validation errors',
      errors: [{ field: 'password', message: 'Password must be at least 6 characters long', value: '123' }]
    });
    expect(next).not.toHaveBeenCalled();
  });
});
