import { NextFunction, Request, Response } from 'express';

export async function borrowBookController(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        console.log(req.body);

        res.status(201).json({ message: 'borrow book' });
    } catch (err) {
        next(err);
    }
}
