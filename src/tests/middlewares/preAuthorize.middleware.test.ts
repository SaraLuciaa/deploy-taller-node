import { checkRole } from '../../middlewares/preAuthorize.middleware';
import { UserRole } from '../../interfaces/user.interface';

describe('checkRole middleware', () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = { user: { roles: [UserRole.ADMIN] } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it('should return 403 if user is not authenticated', () => {
    req.user = undefined;
    checkRole(UserRole.ADMIN)(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Access denied. No roles found.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 if user has no roles', () => {
    req.user = { roles: undefined };
    checkRole(UserRole.ADMIN)(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Access denied. No roles found.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 if user does not have required role', () => {
    req.user.roles = [UserRole.USER];
    checkRole(UserRole.ADMIN)(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Access denied.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if user has required role', () => {
    req.user.roles = [UserRole.ADMIN];
    checkRole(UserRole.ADMIN)(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
