import { NextFunction, Request, Response } from 'express';
import { Error, MongooseError } from 'mongoose';
import { ConflictError } from '../errors/mongoose.error.js';
import jwt from 'jsonwebtoken';
import ValidationError from '../errors/zod.error.js';

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
): void {
    console.log(`ERROR: ${req.originalUrl}`, err);

    // Mongoose Errors
    if (err instanceof MongooseError) {
        if (err instanceof Error.DocumentNotFoundError) {
            res.status(404).json({ message: 'Data not found' });
            return;
        }

        if (err instanceof Error.ValidationError) {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }

        if (err instanceof ConflictError) {
            res.status(409).json({
                message: `Conflict, data already exists: ${err.message}`,
            });
            return;
        }
    }

    // JWT Errors
    if (err instanceof jwt.JsonWebTokenError) {
        res.status(403).json({ message: 'Invalid token' });
        return;
    }
    if (err instanceof jwt.TokenExpiredError) {
        res.status(401).json({ message: 'Token Expired' });
        return;
    }

    // zod validation error
    if (err instanceof ValidationError) {
        res.status(400).json({ message: err.customMessage });
        return;
    }

    res.status(500).json({ message: 'Unknown error' });
}
