import { M_USER } from '../model/user.model.js';
import { User } from '../../../types/users.types.js';
import { MongooseRepoImpl } from './mongoose.repo.js';

export interface UserRepository {
    createUser: (userData: Omit<User, 'role'>, role: 'USER') => Promise<M_USER>;

    findByEmail: (email: string) => Promise<M_USER>;

    findById: (id: string) => Promise<M_USER>;
}

const UserRepo: UserRepository = new MongooseRepoImpl();

export default UserRepo;
