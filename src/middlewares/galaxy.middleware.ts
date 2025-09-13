import { Request, Response, NextFunction } from 'express';
import { GalaxyModel } from '../models/galaxy.model';
import { UserRole } from '../interfaces/user.interface';

export const galaxyOwnerOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: user not authenticated.' });
        }

        if (user.roles && user.roles.includes(UserRole.ADMIN)) {
            return next();
        }

        const galaxyId = req.params.id;
        if (!galaxyId) {
            return res.status(400).json({ message: 'Galaxy ID required.' });
        }

        const galaxy = await GalaxyModel.findById(galaxyId);
        if (!galaxy) {
            return res.status(404).json({ message: 'Galaxy not found.' });
        }

        if (galaxy.createdBy.toString() === user.id) {
            return next();
        }
        return res.status(403).json({ message: 'You can only access your own galaxies.' });
    } catch (error) {
        return res.status(500).json({ message: 'Authorization error', error });
    }
};
