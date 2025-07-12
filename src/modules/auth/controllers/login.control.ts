import { NextFunction, Request, Response } from 'express';

import { REFRESH_COOKIE_OPTIONS } from '../../../config/cookie.config.js';
import { LoginBody } from '../../../types/users.types.js';
import { userLogin } from '../services/users/login.service.js';
import {
    generateAccToken,
    generateRefToken,
} from '../services/tokens/generate.tokens.js';

export async function login(
    req: Request<unknown, unknown, LoginBody>,
    res: Response,
    next: NextFunction,
): Promise<void> {
    const { email, password } = req.body;

    try {
        const user = await userLogin({ email, password });
        const refreshToken = generateRefToken(user.email, user.id, 'USER');

        res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);

        const accessToken = generateAccToken(user.email, user.id, 'USER');

        res.status(201).json({
            userId: user.id,
            accessToken,
        });
        return;
    } catch (err) {
        next(err);
    }
}
