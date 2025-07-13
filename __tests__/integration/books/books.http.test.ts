import supertest from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../../../src/main.js';
import { createBookObject } from '../../factories/book.factory.js';

describe('for requests to /api/v1/books', () => {
    const { title, author } = createBookObject();

    it('should send 201', async () => {
        const res = await supertest(app)
            .post('/api/v1/books/78/borrow')
            .send({ title, author });

        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toMatch(/borrow/);
    });
});
