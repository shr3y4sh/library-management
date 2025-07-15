import { BookDetails } from '../../../types/books.types.js';
import BookModel, { M_BOOK } from '../model/book.model.js';
import { BookRepository } from './book.repo.js';

export default class MongooseBookImpl implements BookRepository {
    createBook = async (bookData: BookDetails): Promise<M_BOOK> => {
        const book = await BookModel.create(bookData);

        return book;
    };

    findBookByName = async (name: string): Promise<M_BOOK> => {
        return await BookModel.findOne({ title: name });
    };

    getAllBooks = async (): Promise<Array<M_BOOK>> => {
        const books = await BookModel.find({});
        return books;
    };
}
