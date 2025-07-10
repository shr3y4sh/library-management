import { Request, Response } from 'express';
import { LoginBody, RegisterBody } from './types.js';
import { Error, MongooseError } from 'mongoose';
import { userLogin, userRegister } from './services/user.service.js';
import {
    generateAccToken,
    generateRefToken,
} from './services/tokens.service.js';
import { REFRESH_COOKIE_OPTIONS } from '../../config/cookie.config.js';

export async function register(
    req: Request<unknown, unknown, RegisterBody>,
    res: Response,
): Promise<void> {
    const userData = req.body;

    try {
        const user = await userRegister(userData);

        const refreshToken = generateRefToken(user.email, user.id);

        res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);

        const accessToken = generateAccToken(user.email, user.id);

        res.status(201).json({
            userId: user.id,
            accessToken,
        });
    } catch (err) {
        if (err instanceof MongooseError) {
            res.status(409).json({ message: `Conflict Error: ${err.message}` });
            return;
        } else {
            console.log(err);
            res.sendStatus(500);
        }
    }
}

export async function login(
    req: Request<unknown, unknown, LoginBody>,
    res: Response,
): Promise<void> {
    const { email, password } = req.body;

    try {
        const user = await userLogin({ email, password });
        const refreshToken = generateRefToken(user.email, user.id);

        res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);

        const accessToken = generateAccToken(user.email, user.id);

        res.status(201).json({
            userId: user.id,
            accessToken,
        });
    } catch (err) {
        if (
            err instanceof Error.DocumentNotFoundError ||
            err instanceof Error.ValidationError
        ) {
            res.status(401).json({ message: `Unauthorized: ${err.message}` });
            return;
        } else {
            console.log(err);
            res.sendStatus(500);
        }
    }
}
