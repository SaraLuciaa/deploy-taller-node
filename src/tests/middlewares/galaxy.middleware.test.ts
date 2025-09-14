import { galaxyOwnerOrAdmin } from '../../middlewares/galaxy.middleware';
import { UserRole } from '../../interfaces/user.interface';
import { GalaxyModel } from '../../models/galaxy.model';

describe('galaxyOwnerOrAdmin middleware', () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = { params: { id: 'galaxyId' }, user: { id: 'userId', roles: [UserRole.USER] } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it('should return 401 if user is not authenticated', async () => {
    req.user = undefined;
    await galaxyOwnerOrAdmin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized: user not authenticated.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if user is admin', async () => {
    req.user.roles = [UserRole.ADMIN];
    await galaxyOwnerOrAdmin(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return 400 if galaxyId is missing', async () => {
    req.params.id = undefined;
    await galaxyOwnerOrAdmin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Galaxy ID required.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 404 if galaxy not found', async () => {
    jest.spyOn(GalaxyModel, 'findById').mockResolvedValue(null);
    await galaxyOwnerOrAdmin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Galaxy not found.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if user is owner', async () => {
    const mockGalaxy = { createdBy: { toString: () => 'userId' } };
    jest.spyOn(GalaxyModel, 'findById').mockResolvedValue(mockGalaxy);
    await galaxyOwnerOrAdmin(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return 403 if user is not owner', async () => {
    const mockGalaxy = { createdBy: { toString: () => 'otherUserId' } };
    jest.spyOn(GalaxyModel, 'findById').mockResolvedValue(mockGalaxy);
    await galaxyOwnerOrAdmin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'You can only access your own galaxies.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 500 on unexpected error', async () => {
    jest.spyOn(require('../../models/galaxy.model'), 'GalaxyModel').mockImplementation(() => { throw new Error('Unexpected'); });
    await galaxyOwnerOrAdmin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Authorization error', error: expect.any(Error) });
    expect(next).not.toHaveBeenCalled();
  });
});
