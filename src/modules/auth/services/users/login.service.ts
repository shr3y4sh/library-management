import { Error } from 'mongoose';
import { LoginBody, User } from '../../../../types/users.types.js';
import { comparePasswords } from '../../../../utilities/encrypt.util.js';
import UserRepo from '../../repository/user.repo.js';

export async function userLogin(userData: LoginBody): Promise<User> {
    const { email, password } = userData;

    const user = await UserRepo.findByEmail(email);

    if (!user) {
        throw new Error.ValidationError();
    }

    const passCompare = comparePasswords(password, user.passwordHash);

    if (!passCompare) {
        throw new Error.ValidationError();
    }

    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user._id.toString(),
        role: user.role,
        password: null,
    };
}
