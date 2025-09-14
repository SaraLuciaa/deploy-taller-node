import { authMiddleware } from '../../middlewares/auth.middleware';

describe('authMiddleware', () => {
  it('should return 401 if no token is provided', () => {
    const req = { headers: {} } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Access denied. No token provided.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 if token is invalid', () => {
    const req = { headers: { authorization: 'Bearer invalidtoken' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token.' });
    expect(next).not.toHaveBeenCalled();
  });
});
