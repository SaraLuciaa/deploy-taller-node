import { Request, Response, NextFunction } from 'express';
import { PlanetModel } from '../models/planet.model';
import { UserRole } from '../interfaces/user.interface';

export const planetOwnerOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: user not authenticated.' });
        }

        if (user.roles && user.roles.includes(UserRole.ADMIN)) {
            return next();
        }

        const planetId = req.params.id;
        if (!planetId) {
            return res.status(400).json({ message: 'Planet ID required.' });
        }

        const planet = await PlanetModel.findById(planetId);
        if (!planet) {
            return res.status(404).json({ message: 'Planet not found.' });
        }

        if (planet.createdBy.toString() === user.id) {
            return next();
        }
        return res.status(403).json({ message: 'You can only access your own galaxies.' });
    } catch (error) {
        return res.status(500).json({ message: 'Authorization error', error });
    }
};
