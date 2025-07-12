// import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: { id: string; role: 'USER' | 'ADMIN' };
        }
    }
}

export {};
// export interface AuthRequest extends Request {
//     user: {
//         id: string;
//         role: 'USER' | 'ADMIN';
//     };
// }
