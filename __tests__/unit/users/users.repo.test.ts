import '../../setup.js';
import { describe, expect, it } from 'vitest';
import UserRepo from '../../../src/modules/auth/repository/user.repo.js';
import {
    createUserDoc,
    createUserObject,
} from '../../factories/user.factory.js';

describe('user repository tests', () => {
    const { firstName, lastName, email, password } = createUserObject();

    it('should create a user', async () => {
        const response = await UserRepo.createUser(
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
            const { firstName, lastName, email, passwordHash } =
                createUserDoc();
            resultList.push(
                await UserRepo.createUser(
                    { firstName, lastName, email, password: passwordHash },
                    'USER',
                ),
            );
        }

        expect(resultList.length).toBe(5);
    });
});
