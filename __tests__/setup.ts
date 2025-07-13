import 'dotenv/config';
import mongoose from 'mongoose';
import { afterAll, beforeAll, beforeEach } from 'vitest';

beforeAll(async () => {
    const uri = process.env.TEST_DATABASE_URI;
    await mongoose.connect(uri);
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.connection.close();
});
