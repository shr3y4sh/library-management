import { ConflictError } from '../../../../errors/mongoose.error.js';
import { RegisterBody, User } from '../../../../types/users.types.js';
import { encryptPassword } from '../../../../utilities/encrypt.util.js';
import UserRepo from '../../repository/user.repo.js';

export async function userRegister(userData: RegisterBody): Promise<User> {
    const { firstName, lastName, email, password } = userData;

    const userExists = await UserRepo.findByEmail(email);

    if (userExists) {
        throw new ConflictError('User already exists');
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
        role: newUser.role,
        password: null,
    };
}
