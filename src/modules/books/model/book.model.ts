import { Document, model, Schema } from 'mongoose';
import { Book } from '../../../types/books.types.js';

export interface M_BOOK extends Document, Omit<Book, 'id'> {
    totalCopies: number;
}

const bookSchema = new Schema<M_BOOK>(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publisher: {
            type: String,
            required: true,
        },
        publishedYear: {
            type: Number,
            required: true,
        },
        totalCopies: {
            type: Number,
            required: true,
        },
        availableCopies: {
            type: Number,
            required: true,
        },
        genres: [String],
        summary: String,
    },
    {
        timestamps: true,
    },
);

const BookModel = model('book', bookSchema);

export default BookModel;
