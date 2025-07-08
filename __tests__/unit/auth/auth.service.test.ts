import supertest from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../../../src/main.js';
import { faker } from '@faker-js/faker';

describe('for authorization', () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    const password = faker.internet.password({ length: 8, memorable: true });

    it('should return ID for registration', async () => {
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

        console.log(response.body);
        expect(response.body.id).toStrictEqual(42);
    });
});
