import { NextFunction, Request, Response } from 'express';

export function logRequests(
    req: Request,
    _res: Response,
    next: NextFunction,
): void {
    const { method, url, body, headers } = req;

    console.log(`METHOD         ${method}`);
    console.log(`URL            ${url}`);
    console.log(`BODY           `, body);
    console.log(`HEADERS        `, headers);

    next();
}
