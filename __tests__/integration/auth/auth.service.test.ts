import supertest from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import app from '../../../src/main.js';
import { faker } from '@faker-js/faker';
import * as RegisterService from '../../../src/modules/auth/services/user.service.js';
import * as TokenService from '../../../src/modules/auth/services/tokens.service.js';
import { MongooseError } from 'mongoose';
import { createUserObject } from '../../factories/user.factory.js';

describe('for /api/v1/auth', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    const { firstName, lastName, password, id, email } = createUserObject();

    const refreshToken = faker.internet.jwt({
        payload: { userId: id, email },
    });
    const accessToken = faker.internet.jwt({
        payload: { userId: id, email },
    });

    it('should return 201 on success', async () => {
        vi.spyOn(RegisterService, 'userRegister').mockResolvedValueOnce({
            firstName,
            lastName,
            email,
            id,
            password: null,
        });

        vi.spyOn(TokenService, 'generateRefToken').mockReturnValue(
            refreshToken,
        );
        vi.spyOn(TokenService, 'generateAccToken').mockReturnValue(accessToken);

        const response = await supertest(app)
            .post('/api/v1/auth/register')
            .send({
                firstName,
                lastName,
                email,
                password,
            })
            .expect(201)
            .expect('Content-Type', /json/);

        expect(response.body).toHaveProperty('userId');
        expect(response.headers['set-cookie'][0]).toMatch(
            `refreshToken=${refreshToken}`,
        );
    });

    it('should return 409 if user already exists', async () => {
        vi.spyOn(RegisterService, 'userRegister').mockRejectedValueOnce(
            new MongooseError('User already exists'),
        );

        const res = await supertest(app).post('/api/v1/auth/register').send({
            firstName,
            lastName,
            email,
            password,
        });

        expect(res.status).toBe(409);
        expect(res.body.message).toContain('Conflict Error');
    });

    it('should return 500 on unknown error', async () => {
        vi.spyOn(RegisterService, 'userRegister').mockRejectedValueOnce(
            new Error('Unexpected'),
        );

        const res = await supertest(app).post('/api/v1/auth/register').send({
            firstName,
            lastName,
            email,
            password,
        });

        expect(res.status).toBe(500);
    });

    it('should send 400 for wrong data', async () => {
        const response = await supertest(app)
            .post('/api/v1/auth/register')
            .send({
                firstName,
                lastName,
                email: 'shuuh',
                password,
            });

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toMatch(/Invalid request/);
    });
});
