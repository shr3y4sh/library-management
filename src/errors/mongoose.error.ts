import { MongooseError } from 'mongoose';

export class ConflictError extends MongooseError {
    statusCode: number;

    constructor(message: string, statusCode: number = 409) {
        super(message);

        this.statusCode = statusCode;
    }
}
