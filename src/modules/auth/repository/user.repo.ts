import UserModel, { M_USER } from '../model/user.model.js';
import { User } from '../types.js';

export async function createUser(
    userData: User,
    role: 'USER',
): Promise<M_USER> {
    const { firstName, lastName, email, password } = userData;


    const userDb = await UserModel.create({
        firstName,
        lastName,
        email,
        passwordHash: password,
        role,
    });

    return userDb;
}

export async function findByEmail(email:string): Promise<M_USER> {
    return await UserModel.findOne({email});
}