import { REFRESH_COOKIE_OPTIONS } from '../../../config/cookie.config.js';
import { RegisterBody } from '../../../types/users.types.js';
import { NextFunction, Request, Response } from 'express';
import { userRegister } from '../services/users/register.service.js';
import {
    generateRefToken,
    generateAccToken,
} from '../services/tokens/generate.tokens.js';

export async function register(
    req: Request<unknown, unknown, RegisterBody>,
    res: Response,
    next: NextFunction,
): Promise<void> {
    const userData = req.body;
    try {
        const user = await userRegister(userData);

        const refreshToken = generateRefToken(user.email, user.id, user.role);

        res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);

        const accessToken = generateAccToken(user.email, user.id, user.role);

        res.status(201).json({
            userId: user.id,
            accessToken,
        });
        return;
    } catch (err) {
        next(err);
    }
}
