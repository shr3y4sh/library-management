import jwt from 'jsonwebtoken';

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
