import { userOwnerOrAdmin } from '../../middlewares/userOwnerOrAdmin.middleware';
import { UserRole } from '../../interfaces/user.interface';

describe('userOwnerOrAdmin middleware', () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = { params: { userId: 'userId' }, user: { id: 'userId', roles: [UserRole.USER] } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it('should return 401 if user is not authenticated', () => {
    req.user = undefined;
    userOwnerOrAdmin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized: user not authenticated.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if user is admin', () => {
    req.user.roles = [UserRole.ADMIN];
    userOwnerOrAdmin(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should call next if user is owner', () => {
    userOwnerOrAdmin(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return 403 if user is not owner or admin', () => {
    req.user.id = 'otherUserId';
    userOwnerOrAdmin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden: you can only access your own resources or be admin.' });
    expect(next).not.toHaveBeenCalled();
  });
});
