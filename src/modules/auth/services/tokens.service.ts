import jwt from 'jsonwebtoken';

export interface JwtPayload {
    email: string;
    id: string;
    role: string;
}

const REF_TOKEN_KEY =
    process.env.JWT_REFRESH_SECRET || 'jwt_refresh_token_secret_key_alpha';
const ACC_TOKEN_KEY =
    process.env.JWT_ACCESS_SECRET || 'jwt_access_token_secret_key_alpha';

export function generateRefToken(
    email: string,
    id: string,
    role: string,
): string {
    return jwt.sign({ email, id, role }, REF_TOKEN_KEY, {
        expiresIn: '15d',
    });
}

export function generateAccToken(
    email: string,
    id: string,
    role: string,
): string {
    return jwt.sign({ email, id, role }, ACC_TOKEN_KEY, {
        expiresIn: '15m',
    });
}

export function verifyRefreshToken(refToken: string): JwtPayload {
    return jwt.verify(refToken, REF_TOKEN_KEY) as JwtPayload;
}
export function verifyAccessToken(accToken: string): JwtPayload {
    return jwt.verify(accToken, ACC_TOKEN_KEY) as JwtPayload;
}
