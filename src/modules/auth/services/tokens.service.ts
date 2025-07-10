import jwt from 'jsonwebtoken';

const REF_TOKEN_KEY = process.env.JWT_REFRESH_SECRET || 'jwt_refresh_token_secret_key_alpha'
const ACC_TOKEN_KEY = process.env.JWT_ACCESS_SECRET || 'jwt_access_token_secret_key_alpha'

export function generateRefToken(email: string, id: string): string {
    return jwt.sign({ email, userid: id}, REF_TOKEN_KEY, {
        expiresIn: '15d'
    })
}

export function generateAccToken(email: string, id: string): string {
    return jwt.sign({ email, userid: id}, ACC_TOKEN_KEY, {
        expiresIn: '1h'
    })
}
