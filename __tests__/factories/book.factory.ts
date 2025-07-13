import { faker } from '@faker-js/faker';
import { M_BOOK } from '../../src/modules/books/model/book.model.js';
import { Book } from '../../src/types/books.types.js';

export function createBookDoc(data: Partial<M_BOOK> = {}): M_BOOK {
    const title = faker.book.title();
    const author = faker.book.author();
    const publisher = faker.book.publisher();
    const publishedYear = Math.floor(1900 + Math.random() * 2020);
    const totalCopies = 10;
    const availableCopies = 6;
    const summary = 'random book summary';
    const _id = faker.database.mongodbObjectId();
    const genres = [];

    for (let i = 0; i < 3; i++) {
        genres.push(faker.book.genre());
    }

    return {
        title,
        author,
        publisher,
        publishedYear,
        totalCopies,
        availableCopies,
        summary,
        _id,
        genres,
        toObject: () => ({
            _id,
            title,
            author,
            publishedYear,
            publisher,
            totalCopies,
            availableCopies,
            genres,
            summary,
        }),
        ...data,
    } as unknown as M_BOOK;
}

export function createBookObject(): Book {
    const { _id, ...book } = createBookDoc();

    return { ...book, id: _id.toString() };
}
