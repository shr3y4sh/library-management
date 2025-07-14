import { NextFunction, Request, Response } from 'express';
import { BookSchema } from '../types/books.types.js';
import ValidationError from '../errors/zod.error.js';

export async function bookDetailsValidation(
    req: Request,
    _res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const result = BookSchema.safeParse(req.body);

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
