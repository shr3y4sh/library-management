import { Book, BookDetails } from '../../../types/books.types.js';
import BookRepo from '../repository/book.repo.js';

export async function addBookService(details: BookDetails): Promise<Book> {
    const book = await BookRepo.createBook(details);

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
