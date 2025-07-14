import express from 'express';

//
import RequestBodyValidation from '../../middlewares/validation.middle.js';
import { adminLogin } from './controllers/adminLogin.control.js';
import {
    adminValidation,
    authorizationHandler,
} from '../../middlewares/auth.middle.js';
import { bookDetailsValidation } from '../../middlewares/bookDetails.validation.js';
import { createBookHandler } from './controllers/bookCreate.control.js';

const { loginBodyValidation } = RequestBodyValidation;

const router = express.Router();

router.post('/login', loginBodyValidation, adminLogin);

router.post(
    '/books',
    authorizationHandler,
    adminValidation,
    bookDetailsValidation,
    createBookHandler,
);

// router.put('/books/:bookId');

// router.delete('/books/:bookId');

export default router;
