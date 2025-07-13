import { faker } from '@faker-js/faker';
import { M_USER } from '../../src/modules/auth/model/user.model.js';
import { User } from '../../src/types/users.types.js';
import { createBookDoc } from './book.factory.js';

export function createUserDoc(data: Partial<M_USER> = {}): M_USER {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    const password = faker.internet.password({
        length: 16,
        memorable: false,
    });
    const _id = faker.database.mongodbObjectId();
    const role = 'USER';

    const books: string[] = [];

    for (let i = 0; i < 4; i++) {
        books.push(createBookDoc()._id.toString());
    }

    return {
        firstName,
        lastName,
        email,
        passwordHash: password,
        _id,
        role,
        borrowedBooks: books,
        toObject: () => ({
            _id,
            firstName,
            lastName,
            email,
            role,
            borrowedBooks: books,
        }),
        ...data,
    } as unknown as M_USER;
}

export function createUserObject(): User {
    const { firstName, lastName, email, passwordHash, role, _id } =
        createUserDoc();

    return {
        firstName,
        lastName,
        email,
        password: passwordHash,
        id: _id.toString(),
        role,
    };
}
