import { faker } from '@faker-js/faker';
import { M_USER } from '../../src/modules/auth/model/user.model.js';
import { User } from '../../src/types/users.types.js';

export function createUserDoc(data: Partial<M_USER> = {}): M_USER {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    const password = faker.internet.password({
        length: 16,
        memorable: false,
    });
    const _id = faker.database.mongodbObjectId();
    return {
        firstName,
        lastName,
        email,
        passwordHash: password,
        _id,
        role: 'USER',
        toObject: () => ({
            _id,
            firstName,
            lastName,
            email,
            role: 'USER',
        }),
        ...data,
    } as unknown as M_USER;
}

export function createUserObject(): User {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    const password = faker.internet.password({
        length: 16,
        memorable: false,
    });
    const id = faker.database.mongodbObjectId();

    return { firstName, lastName, email, password, id };
}
