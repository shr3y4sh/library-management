import { beforeEach, expect, it } from 'vitest';
import { describe, vi } from 'vitest';
import * as Encrypt from '../../../src/utilities/encrypt.util.js';
import * as UserRepo from '../../../src/modules/auth/repository/user.repo.js';
import { createUserDoc } from '../../factories/user.factory.js';
import { userRegister } from '../../../src/modules/auth/services/user.service.js';

describe('for testing userServices', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('should create user', async () => {
        const userDoc = createUserDoc();
        const { passwordHash, firstName, lastName, email, _id } = userDoc;

        vi.spyOn(UserRepo, 'createUser').mockResolvedValueOnce(userDoc);
        vi.spyOn(UserRepo, 'findByEmail').mockResolvedValueOnce(null);
        vi.spyOn(Encrypt, 'encryptPassword').mockResolvedValueOnce(
            passwordHash,
        );

        const user = await userRegister({
            firstName,
            lastName,
            email,
            password: passwordHash,
        });

        console.log(user)
        expect(user).toMatchObject({
            id: _id,
            email,
        });
        // expect(user.id).toEqual(_id);
    });
});
