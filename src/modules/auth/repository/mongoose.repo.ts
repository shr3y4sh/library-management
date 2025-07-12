import UserModel, { M_USER } from '../model/user.model.js';
import { User } from '../../../types/users.types.js';
import { UserRepository } from './user.repo.js';

export class MongooseRepoImpl implements UserRepository {
    constructor() {}
    findById = async (id: string): Promise<M_USER> => {
        const user = await UserModel.findById(id);

        return user;
    };

    createUser = async (userData: User, role: 'USER'): Promise<M_USER> => {
        const { firstName, lastName, email, password } = userData;

        const userDb = await UserModel.create({
            firstName,
            lastName,
            email,
            passwordHash: password,
            role,
        });

        return userDb;
    };

    findByEmail = async (email: string): Promise<M_USER> => {
        return await UserModel.findOne({ email });
    };
}
