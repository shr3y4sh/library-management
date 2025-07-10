import { MongooseError } from "mongoose";
import { createUser, findByEmail } from "../repository/user.repo.js";
import { encryptPassword } from "../../../utilities/encrypt.util.js";
import { RegisterBody, User } from "../types.js";

export async function userRegister(userData: RegisterBody): Promise<User> {
    const {firstName, lastName, email, password} = userData;

    const userExists = await findByEmail(email);

    if (userExists) {
        throw new MongooseError('User already exists')
    }

    const passwordHash = await encryptPassword(password);

    const newUser = await createUser({firstName, lastName, email, password: passwordHash}, 'USER');

    return {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        id: newUser._id.toString(),
        password: null
    }
}