import 'dotenv/config';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import UserRepo from '../../../src/modules/auth/repository/user.repo.js';
import {
    createUserDoc,
    createUserObject,
} from '../../factories/user.factory.js';
import mongoose from 'mongoose';

describe('user repository tests', () => {
    //

    beforeAll(async () => {
        const uri =
            'mongodb+srv://maddy:qhnzQ9hM53CcdeGV@main-cluster.hnpq0yl.mongodb.net/testlibrary?retryWrites=true&w=majority&appName=main-cluster';
        await mongoose.connect(uri);
    });

    let gEmail: string;

    beforeEach(async () => {
        const { firstName, lastName, email, password } = createUserObject();
        gEmail = email;
        await UserRepo.createUser(
            { firstName, lastName, email, password },
            'USER',
        );
    });

    afterAll(async () => {
        const collections = await mongoose.connection.db.collections();
        for (const collection of collections) {
            await collection.deleteMany({});
        }
        await mongoose.connection.close();
    });

    it('should create a user', async () => {
        const { firstName, lastName, email, password } = createUserObject();
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

    it('should find user by given email', async () => {
        const response = await UserRepo.findByEmail(gEmail);

        expect(response).toHaveProperty('_id');
    });

    it('should find user by given ID', async () => {
        const { _id } = await UserRepo.findByEmail(gEmail);

        const res = await UserRepo.findById(_id.toString());

        expect(res).toHaveProperty('_id');
        expect(res._id).toEqual(_id);
    });
});
