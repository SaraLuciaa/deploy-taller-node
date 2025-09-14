import { planetOwnerOrAdmin } from '../../middlewares/planet.middleware';
import { UserRole } from '../../interfaces/user.interface';

jest.mock('../../models/planet.model', () => ({
  PlanetModel: { findById: jest.fn() }
}));
import { PlanetModel } from '../../models/planet.model';

describe('planetOwnerOrAdmin middleware', () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = { user: { id: 'user123', roles: [UserRole.USER] }, params: { id: 'planet1' } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  (PlanetModel.findById as jest.Mock).mockReset();
  });

  it('should return 401 if user is not authenticated', async () => {
    req.user = undefined;
    await planetOwnerOrAdmin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized: user not authenticated.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if user is admin', async () => {
    req.user.roles = [UserRole.ADMIN];
    await planetOwnerOrAdmin(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return 400 if planetId is missing', async () => {
    req.params.id = undefined;
    await planetOwnerOrAdmin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Planet ID required.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 404 if planet not found', async () => {
  (PlanetModel.findById as jest.Mock).mockResolvedValue(null);
    await planetOwnerOrAdmin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Planet not found.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if user is owner', async () => {
  (PlanetModel.findById as jest.Mock).mockResolvedValue({ createdBy: 'user123', toString() { return this.createdBy; } });
    await planetOwnerOrAdmin(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return 403 if user is not owner', async () => {
  (PlanetModel.findById as jest.Mock).mockResolvedValue({ createdBy: 'otherUser', toString() { return this.createdBy; } });
    await planetOwnerOrAdmin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'You can only access your own galaxies.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 500 on error', async () => {
  (PlanetModel.findById as jest.Mock).mockRejectedValue(new Error('DB error'));
    await planetOwnerOrAdmin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Authorization error' }));
    expect(next).not.toHaveBeenCalled();
  });
});
