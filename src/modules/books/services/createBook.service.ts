import { Book, BookDetails } from '../../../types/books.types.js';
import { extractBookData } from '../../../utilities/booksDataExtract.js';
import BookRepo from '../repository/book.repo.js';

export async function addBookService(details: BookDetails): Promise<Book> {
    const book = await BookRepo.createBook(details);

    return extractBookData(book);
}
