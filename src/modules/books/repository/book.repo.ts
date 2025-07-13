import { Book } from '../../../types/books.types.js';
import { M_BOOK } from '../model/book.model.js';
import MongooseBookImpl from './mongoose.repoimpl.js';

export interface BookRepository {
    createBook: (bookData: Book) => Promise<M_BOOK>;

    findBookByName: (name: string) => Promise<M_BOOK>;
}

const BookRepo: BookRepository = new MongooseBookImpl();

export default BookRepo;
