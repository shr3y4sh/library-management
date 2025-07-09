import bcrypt from 'bcryptjs';
import { compare } from 'bcryptjs';

export async function encryptPassword(password: string): Promise<string> {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
}

export async function comparePasswords(
    password: string,
    hashPassword: string,
): Promise<boolean> {
    return await compare(password, hashPassword);
}
