import { NextFunction, Request, Response } from 'express';
import { LoginSchema, RegistrationSchema } from '../modules/auth/types.js';

export function registerBodyValidation(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    try {
        const result = RegistrationSchema.safeParse(req.body);

        if (!result.success) {
            console.log('registration invalid');
            res.status(400).json({ message: 'Invalid request data' });
            return;
        }

        next();
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
        return;
    }
}

export function loginBodyValidation(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const result = LoginSchema.safeParse(req.body);

    if (!result.success) {
        console.log('login invalid');
        res.status(400).json({ message: 'Invalid request data' });
        return;
    }

    next();
}
