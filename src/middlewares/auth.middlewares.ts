import { NextFunction, Request, Response } from 'express';
import { LoginSchema, RegistrationSchema } from '../modules/auth/types.js';

export function registerBodyValidation(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const result = RegistrationSchema.safeParse(req.body);

    if (!result.success) {
        console.log('registration invalid');
        res.status(400).json({ message: 'Invalid request data' });
        return;
    }

    next();
}
export function loginBodyValidation(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const result = LoginSchema.safeParse(req.body);

    if (!result.success) {
        console.log('registration invalid');
        res.status(400).json({ message: 'Invalid request data' });
        return;
    }

    next();
}
