import { NextFunction, Request, Response } from 'express';
import { Book } from '../../../types/books.types.js';
import BookService from '../services/index.js';

export async function getBooks(
    _req: Request,
    res: Response<Array<Book>>,
    next: NextFunction,
): Promise<void> {
    try {
        const books = await BookService.getBooks();

        res.status(200).json(books);
    } catch (err) {
        next(err);
    }
}
