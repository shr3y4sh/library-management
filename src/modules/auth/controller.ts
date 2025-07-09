import { Request, Response } from 'express';
import { RegisterBody } from './types.js';
import { createUser } from './repository/user.repo.js';
import { MongooseError } from 'mongoose';

export async function register(
    req: Request<unknown, unknown, RegisterBody>,
    res: Response,
): Promise<void> {
    const userData = req.body;

    try {
        const userDoc = await createUser(userData, 'USER');

        const { firstName, lastName, email, role, _id } = userDoc;

        // generate tokens

        res.status(201).json({
            firstName,
            lastName,
            email,
            role,
            id: _id.toString(),
        });
    } catch (err) {
        if (err instanceof MongooseError) {
            res.status(409).json({ message: 'Conflict' });
            return;
        } else {
            res.sendStatus(500);
        }
    }
}
