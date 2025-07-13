import { Document, model, Schema } from 'mongoose';
import { User } from '../../../types/users.types.js';

export interface M_USER
    extends Document,
        Omit<User, 'id' | 'password' | 'borrowedBooks'> {
    passwordHash: string;
    role: 'USER' | 'ADMIN';
    borrowedBooks: Array<Schema.Types.ObjectId>;
}

const userSchema = new Schema<M_USER>(
    {
        firstName: String,
        lastName: String,
        email: {
            type: String,
            required: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        role: {
            type: 'String',
            required: true,
        },
        borrowedBooks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Book',
            },
        ],
    },
    {
        timestamps: true,
    },
);

const UserModel = model('user', userSchema);

export default UserModel;
