import { Request, Response } from 'express';
import { LoginBody } from '../../../types/users.types.js';

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
