import { Book } from '../../../types/books.types.js';
import { extractBookData } from '../../../utilities/booksDataExtract.js';
import BookRepo from '../repository/book.repo.js';

export async function getBooks(): Promise<Array<Book>> {
    const books = await BookRepo.getAllBooks();

    return books.map(extractBookData);
}
