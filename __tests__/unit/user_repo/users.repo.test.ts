import '../../setup.test.js';
import { describe, expect, it } from 'vitest';
import { createUser } from '../../../src/modules/auth/repository/user.repo.js';
import { faker } from '@faker-js/faker';

describe('user repository tests', () => {
    let firstName = faker.person.firstName();
    let lastName = faker.person.lastName();
    let email = faker.internet.email({ firstName, lastName });
    let password = faker.internet.password({ length: 8, memorable: true });

    it('should create a user', async () => {
        const response = await createUser(
            { firstName, lastName, email, password },
            'USER',
        );

        expect(response).toHaveProperty('_id');
        expect(response.email).toBe(email);
        expect(response).toHaveProperty('passwordHash');
    });

    it('should create multiple users', async () => {
        const resultList = [];

        for (let i = 0; i < 5; i++) {
            firstName = faker.person.firstName();
            lastName = faker.person.lastName();
            email = faker.internet.email({ firstName, lastName });
            password = faker.internet.password({ length: 8, memorable: true });
            resultList.push(
                await createUser(
                    { firstName, lastName, email, password },
                    'USER',
                ),
            );
        }

        expect(resultList.length).toBe(5);
    });
});
