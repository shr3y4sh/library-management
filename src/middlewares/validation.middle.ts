import { NextFunction, Request, Response } from 'express';
import { LoginSchema, RegistrationSchema } from '../types/users.types.js';
import ValidationError from '../errors/zod.error.js';

export function registerBodyValidation(
    req: Request,
    _res: Response,
    next: NextFunction,
): void {
    try {
        const result = RegistrationSchema.safeParse(req.body);

        if (!result.success) {
            const err = result.error;
            console.log(err.issues);
            throw new ValidationError(err.issues);
        }

        next();
    } catch (err) {
        next(err);
    }
}

export function loginBodyValidation(
    req: Request,
    _res: Response,
    next: NextFunction,
): void {
    try {
        const result = LoginSchema.safeParse(req.body);

        if (!result.success) {
            const err = result.error;
            console.log(err.issues);
            throw new ValidationError(err.issues);
        }
        next();
    } catch (err) {
        next(err);
    }
}
