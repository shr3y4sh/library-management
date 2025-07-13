import { NextFunction, Request, Response } from 'express';
import { MongooseError } from 'mongoose';
import UserService from '../services/users/index.js';

export async function userProfile(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const { id } = req.user;
        const user = await UserService.userProfile(id);

        if (!user) {
            throw new MongooseError('Not found');
        }

        res.status(200).json(user);
        return;
    } catch (err) {
        next(err);
    }
}
