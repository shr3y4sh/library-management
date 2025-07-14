import { NextFunction, Request, Response } from 'express';
import { LoginBody } from '../../../types/users.types.js';
import UserService from '../../auth/services/users/index.js';
import TokenService from '../../auth/services/tokens/index.js';
import HttpError from '../../../errors/custom.error.js';
import { REFRESH_COOKIE_OPTIONS } from '../../../config/cookie.config.js';

export async function adminLogin(
    req: Request<unknown, unknown, LoginBody>,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const adminData = req.body;

        const admin = await UserService.userLogin(adminData);

        if (admin.role !== 'ADMIN') {
            throw new HttpError('Forbidden route, contact admin', 403);
        }

        const { email, id } = admin;

        const refreshToken = TokenService.generateRefToken(email, id, 'ADMIN');
        const accessToken = TokenService.generateAccToken(email, id, 'ADMIN');

        res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);

        res.status(201).json({
            id,
            accessToken,
        });
    } catch (err) {
        next(err);
    }
}
