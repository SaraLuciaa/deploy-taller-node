import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../interfaces/user.interface';

export const userOwnerOrAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const userId = req.params.userId;

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized: user not authenticated.' });
    }

    if (user.roles && user.roles.includes(UserRole.ADMIN)) {
        return next();
    }

    if (userId && userId === user.id) {
        return next();
    }

    return res.status(403).json({ message: 'Forbidden: you can only access your own resources or be admin.' });
};
