import { Document, model, Schema } from 'mongoose';

export interface M_USER extends Document {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    role: 'USER' | 'ADMIN';
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
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    },
);

const UserModel = model('user', userSchema);

export default UserModel;
