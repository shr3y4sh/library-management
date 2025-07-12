import { Request, Response } from 'express';
import { LoginBody, RegisterBody } from './types.js';
import { Error, MongooseError } from 'mongoose';
import {
    getUserData,
    userLogin,
    userRegister,
} from './services/user.service.js';
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

        const refreshToken = generateRefToken(user.email, user.id, user.role);

        res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);

        const accessToken = generateAccToken(user.email, user.id, user.role);

        res.status(201).json({
            userId: user.id,
            accessToken,
        });
        return;
    } catch (err) {
        res.clearCookie('refreshToken');
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
        const refreshToken = generateRefToken(user.email, user.id, 'USER');

        res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);

        const accessToken = generateAccToken(user.email, user.id, 'USER');

        res.status(201).json({
            userId: user.id,
            accessToken,
        });
        return;
    } catch (err) {
        res.clearCookie('refreshToken');
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
export async function logout(
    _req: Request<unknown, unknown, LoginBody>,
    res: Response,
): Promise<void> {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
    });

    res.status(200).json({ message: 'Logout successfull' });
}

export async function userProfile(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.user;
        // console.log(id);
        const user = await getUserData(id);

        if (!user) {
            throw new MongooseError('Not found');
        }

        res.status(200).json(user);
        return;
    } catch (err) {
        console.log(err);
        if (err instanceof MongooseError) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(500).json({ message: 'Unknown error' });
    }
}
