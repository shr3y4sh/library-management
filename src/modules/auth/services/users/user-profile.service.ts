import { Error } from 'mongoose';
import UserRepo from '../../repository/user.repo.js';
import { User } from '../../../../types/users.types.js';

export async function getUserData(id: string): Promise<User> {
    const user = await UserRepo.findById(id);

    if (!user) {
        throw new Error.DocumentNotFoundError('');
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
