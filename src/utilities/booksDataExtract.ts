import { M_BOOK } from '../modules/books/model/book.model.js';
import { Book } from '../types/books.types.js';

export function extractBookData(book: M_BOOK): Book {
    const {
        title,
        author,
        summary,
        genres,
        publisher,
        publishedYear,
        totalCopies,
        availableCopies,
    } = book;

    return {
        title,
        author,
        summary,
        genres,
        publisher,
        publishedYear,
        totalCopies,
        availableCopies,
        id: book._id.toString(),
    };
}
