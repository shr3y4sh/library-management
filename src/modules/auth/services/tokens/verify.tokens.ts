import jwt from 'jsonwebtoken';
import { JwtPayload } from '../../../../types/users.types.js';
import configKeys from '../../../../config/config.env_vars.js';
export function verifyRefreshToken(refToken: string): JwtPayload {
    return jwt.verify(refToken, configKeys.jwtRefreshKey) as JwtPayload;
}
export function verifyAccessToken(accToken: string): JwtPayload {
    return jwt.verify(accToken, configKeys.jwtAccessKey) as JwtPayload;
}
