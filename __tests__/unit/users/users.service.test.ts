import { beforeEach, expect, it } from 'vitest';
import { describe, vi } from 'vitest';
import * as Encrypt from '../../../src/utilities/encrypt.util.js';
import UserRepo from '../../../src/modules/auth/repository/user.repo.js';
import { createUserDoc } from '../../factories/user.factory.js';
import UserService from '../../../src/modules/auth/services/users/index.js';

describe('for testing userServices', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });
    const userDoc = createUserDoc();

    it('should register new user', async () => {
        const { passwordHash, firstName, lastName, email, _id } = userDoc;

        vi.spyOn(UserRepo, 'createUser').mockResolvedValueOnce(userDoc);
        vi.spyOn(UserRepo, 'findByEmail').mockResolvedValueOnce(null);
        vi.spyOn(Encrypt, 'encryptPassword').mockResolvedValueOnce(
            passwordHash,
        );

        const user = await UserService.userRegister({
            firstName,
            lastName,
            email,
            password: passwordHash,
        });

        expect(user).toMatchObject({
            firstName,
            lastName,
            password: null,
            role: 'USER',
            id: _id,
            email,
        });
    });

    it('should login a registered user', async () => {
        const { email, passwordHash } = userDoc;

        vi.spyOn(UserRepo, 'findByEmail').mockResolvedValueOnce(userDoc);
        vi.spyOn(Encrypt, 'comparePasswords').mockResolvedValueOnce(true);

        const res = await UserService.userLogin({
            email,
            password: passwordHash,
        });

        expect(res).toHaveProperty('firstName');
        expect(res).toHaveProperty('lastName');
        expect(res).toHaveProperty('email');
        expect(res).toHaveProperty('id');

        expect(res.id).toEqual(userDoc._id);
        expect(res.password).toBe(null);
    });
});
