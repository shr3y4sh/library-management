import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../modules/auth/services/tokens/verify.tokens.js';

export async function authorizationHandler(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    const authorization = req.headers['authorization'];

    if (!authorization || !authorization.startsWith('Bearer')) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const accessToken = authorization.split(' ')[1];

    try {
        const verification = verifyAccessToken(accessToken);

        const { id, role } = verification;

        if (role !== 'USER' && role !== 'ADMIN') {
            throw new Error('role not in USER or ADMIN');
        }

        req.user = { id, role };
        next();
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: 'Invalid or expired token' });
        return;
    }
}

export function adminValidation(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const { role } = req.user;

    if (role !== 'ADMIN') {
        res.status(403).json({ message: 'Forbidden' });
        return;
    }

    next();
}
