import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import BookRepo from '../../../src/modules/books/repository/book.repo.js';
import { createBookObject } from '../../factories/book.factory.js';
import mongoose from 'mongoose';

describe('for book repository implementations', () => {
    beforeAll(async () => {
        const uri =
            'mongodb+srv://maddy:qhnzQ9hM53CcdeGV@main-cluster.hnpq0yl.mongodb.net/testlibrary?retryWrites=true&w=majority&appName=main-cluster';
        await mongoose.connect(uri);
    });

    afterAll(async () => {
        const collections = await mongoose.connection.db.collections();
        for (const collection of collections) {
            await collection.deleteMany({});
        }
        await mongoose.connection.close();
    });

    const bookData = createBookObject();

    it('should create a book', async () => {
        const newBook = await BookRepo.createBook(bookData);

        expect(newBook).toHaveProperty('title');
    });

    it('should find a book by name', async () => {
        const book = await BookRepo.findBookByName(bookData.title);

        expect(book).toHaveProperty('author');
    });
});
