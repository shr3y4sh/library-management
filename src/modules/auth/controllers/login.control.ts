import { NextFunction, Request, Response } from 'express';

import { REFRESH_COOKIE_OPTIONS } from '../../../config/cookie.config.js';
import { LoginBody } from '../../../types/users.types.js';
import TokenService from '../services/tokens/index.js';
import UserService from '../services/users/index.js';

//
export async function login(
    req: Request<unknown, unknown, LoginBody>,
    res: Response,
    next: NextFunction,
): Promise<void> {
    const { email, password } = req.body;

    try {
        const user = await UserService.userLogin({ email, password });
        const refreshToken = TokenService.generateRefToken(
            user.email,
            user.id,
            'USER',
        );

        res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);

        const accessToken = TokenService.generateAccToken(
            user.email,
            user.id,
            'USER',
        );

        res.status(201).json({
            userId: user.id,
            accessToken,
        });
    } catch (err) {
        next(err);
    }
}
