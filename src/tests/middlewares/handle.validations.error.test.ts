
jest.mock('express-validator', () => ({
  validationResult: jest.fn()
}));
import { handleValidationErrors } from '../../middlewares/handle.validations.error';
import { validationResult } from 'express-validator';

describe('handleValidationErrors middleware', () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = {};
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('should return 400 with formatted errors if validation fails', () => {
    const mockErrors = {
      isEmpty: () => false,
      array: () => [
        { type: 'field', path: 'email', msg: 'Invalid email', value: 'bad', location: 'body' },
        { type: 'field', path: 'password', msg: 'Too short', value: '123', location: 'body' },
        { type: 'other', msg: 'Unknown error', location: 'body' }
      ]
    };
  (validationResult as jest.Mock).mockReturnValue(mockErrors);
    handleValidationErrors(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Validation errors',
      errors: [
        { field: 'email', message: 'Invalid email', value: 'bad' },
        { field: 'password', message: 'Too short', value: '123' },
        { field: 'unknown', message: 'Unknown error', value: undefined }
      ]
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if no validation errors', () => {
    const mockErrors = {
      isEmpty: () => true,
      array: () => []
    };
  (validationResult as jest.Mock).mockReturnValue(mockErrors);
    handleValidationErrors(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
