import { NextFunction, Request, Response } from 'express';
import { Book, BookDetails } from '../../../types/books.types.js';
import { addBookService } from '../../books/services/createBook.service.js';

export async function createBookHandler(
    req: Request<unknown, unknown, BookDetails>,
    res: Response<Book>,
    next: NextFunction,
): Promise<void> {
    const bookDetails = req.body;

    try {
        const book = await addBookService(bookDetails);

        res.status(201).json(book);
    } catch (err) {
        next(err);
    }
}
