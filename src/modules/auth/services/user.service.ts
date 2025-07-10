import { Error, MongooseError } from 'mongoose';
import {
    comparePasswords,
    encryptPassword,
} from '../../../utilities/encrypt.util.js';
import { LoginBody, RegisterBody, User } from '../types.js';
import UserRepo from '../repository/user.repo.js';

export async function userRegister(userData: RegisterBody): Promise<User> {
    const { firstName, lastName, email, password } = userData;

    const userExists = await UserRepo.findByEmail(email);

    if (userExists) {
        throw new MongooseError('User already exists');
    }

    const passwordHash = await encryptPassword(password);

    const newUser = await UserRepo.createUser(
        { firstName, lastName, email, password: passwordHash },
        'USER',
    );

    return {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        id: newUser._id.toString(),
        password: null,
    };
}

export async function userLogin(userData: LoginBody): Promise<User> {
    const { email, password } = userData;

    const user = await UserRepo.findByEmail(email);

    if (!user) {
        throw new Error.DocumentNotFoundError('Invalid email or password');
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
        password: null,
    };
}
