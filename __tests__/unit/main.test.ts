import supertest from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../../src/main.js';

describe('Find hello message', () => {
    it('should get hello message from /hello endpoint', async () => {
        const response = await supertest(app)
            .get('/hello')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body.message).includes('hello there');
    });
});
