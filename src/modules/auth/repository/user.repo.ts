import { MongooseError } from 'mongoose';
import { encryptPassword } from '../../../utilities/encrypt.util.js';
import UserModel, { M_USER } from '../model/user.model.js';
import { User } from '../types.js';

export async function createUser(
    userData: User,
    role: 'USER',
): Promise<M_USER> {
    const { firstName, lastName, email, password } = userData;

    const user = await UserModel.findOne({ email });

    if (user) {
        throw new MongooseError('Conflict');
    }

    // encrypt password
    const passwordHash = await encryptPassword(password);

    const userDb = await UserModel.create({
        firstName,
        lastName,
        email,
        passwordHash,
        role,
    });

    return userDb;
}
