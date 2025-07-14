import { describe, expect, it, vi } from 'vitest';
import BookService from '../../../src/modules/books/services/index.js';
import BookRepo from '../../../src/modules/books/repository/book.repo.js';
import { createBookDoc } from '../../factories/book.factory.js';

describe('for book services', () => {
    //

    const bookDoc = createBookDoc();
    const {
        title,
        author,
        publishedYear,
        publisher,
        totalCopies,
        availableCopies,
        genres,
        summary,
    } = bookDoc;

    it('should successfully create a book', async () => {
        vi.spyOn(BookRepo, 'createBook').mockResolvedValueOnce(bookDoc);

        const res = await BookService.addBookService({
            title,
            author,
            publishedYear,
            publisher,
            genres,
            summary,
            totalCopies,
            availableCopies,
        });

        expect(res).toHaveProperty('id');
    });
});
